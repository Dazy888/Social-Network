import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common"
// Schemas
import { UserDocument } from "../../schemas/user.schema"
import { TokenDocument } from "../../schemas/token.schema"
import { PostDocument } from "../../schemas/post.schema"
import { ProfileDocument } from "../../schemas/profile.schema"
import { FollowDocument } from "../../schemas/follow.schema"
import { MailerService } from "@nestjs-modules/mailer"
import {v4} from "uuid";
import {Request} from "express";
import {TokenPayload} from "google-auth-library";

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Token') private tokenModel: Model<TokenDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>,
        @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Follow') private followModel: Model<FollowDocument>,
        private readonly mailerService: MailerService
    ) {}

    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        await this.tokenModel.create({
            userId,
            refreshToken
        })
    }

    async signUp(username: string, pass: string) {
        const existingUser: UserDocument | null = await this.userModel.findOne({ username })
        if (existingUser) throw new BadRequestException('User with this name already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)

        const { id, activatedEmail, email }: UserDocument = await this.userModel.create({
            username,
            password: hashedPassword
        })

        const userNumber = Math.floor(Math.random() * 10000)
        const profile = await this.profileModel.create({
            name: `User_${userNumber}`,
            userId: id
        })

        const tokens = this.generateTokens({ id })
        await this.saveToken(id, tokens.refreshToken)

        return {
            tokens,
            user: {
                id,
                activatedEmail,
                email,
                profile
            }
        }
    }

    async getUserData(id: string) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId: id })

        const posts: PostDocument[] = await this.postModel.find({ userId: id })

        const followers = await this.followModel.find({ followeeId: id })
        const followings = await this.followModel.find({ followerId: id })

        const followersIds = followers.map((follower) => follower.followerId)
        const followingsIds = followings.map((following) => following.followeeId)

        return {
            id,
            profile,
            posts,
            subscriptions: {
                followers: followersIds,
                followings: followingsIds
            }
        }
    }

    async signIn(username: string, pass: string) {
        const user: UserDocument | null = await this.userModel.findOne({ username })
        if (!user) throw new UnauthorizedException('Invalid username or password')

        const isPassEquals = await bcrypt.compare(pass, user.password)
        if (!isPassEquals) throw new UnauthorizedException('Invalid username or password')

        const tokens = this.generateTokens({ id: user.id })
        await this.saveToken(user.id, tokens.refreshToken)

        const userData = await this.getUserData(user.id)
        return {
            tokens,
            user: {
                ...userData,
                activatedEmail: user.activatedEmail,
                email: user.email
            }
        }
    }

    async googleSignIn(payload: TokenPayload) {
        const user: UserDocument | null = await this.userModel.findOne({ email: payload.email })
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const tokens = this.generateTokens({ id: user.id })
        await this.saveToken(user.id, tokens.refreshToken)

        const userData = await this.getUserData(user.id)
        return {
            tokens,
            user: {
                ...userData,
                activatedEmail: user.activatedEmail,
                email: user.email
            }
        }
    }

    async signOut(refreshToken: string) {
        await this.tokenModel.deleteOne({ refreshToken })
    }

    async refresh(refreshToken: string) {
        const { id } = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        if (!id) throw new BadRequestException('User is not authorized')

        const tokenFromDb: TokenDocument | null = await this.tokenModel.findOne({ refreshToken })
        if (!tokenFromDb) throw new BadRequestException('User is not authorized')

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        await this.tokenModel.deleteMany({
            createdAt: {
                $lt: thirtyDaysAgo
            }
        })

        const { activatedEmail, email }: UserDocument = await this.userModel.findOne({ _id: id })
        const userData = await this.getUserData(id)

        return {
            accessToken: jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: {
                ...userData,
                activatedEmail,
                email
            }
        }
    }

    async recoverPass(email: string) {
        const user: any = await this.userModel.findOne({ email, activatedEmail: true })
        if (user) {
            await this.sendRecoveryEmail(email, `${process.env.CLIENT_URL}/auth/new-pass/${v4()}`, user.id)
        } else {
            throw new BadRequestException('There is no user with this e-mail')
        }
    }

    async sendRecoveryEmail(email: string, passRecoveryLink: string, userId: string) {
        await this.userModel.findOneAndUpdate({ _id: userId }, { passRecoveryLink })
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Recovery link',
            html:
                `
                    <div>
                        <p>
                            Dear user,
                            <br/><br/>
                            To recover your password, you need to follow the link below: <a href="${passRecoveryLink}">${passRecoveryLink}</a>
                            <br/>
                            With best regards,
                            <br/>
                            The team of our social network
                        </p>
                    </div>
                `
        })
    }

    async changePass(passRecoveryLink: string, newPass: string) {
        const user = await this.userModel.findOne({ passRecoveryLink })
        if (user) {
            user.password = await bcrypt.hash(newPass, 10)
            user.passRecoveryLink = null
            await user.save()
        } else {
            throw new UnauthorizedException('Invalid link')
        }
    }
}
