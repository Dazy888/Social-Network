import * as dotenv from "dotenv"
import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
import { MailerService } from "@nestjs-modules/mailer"
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { UserDocument } from "../../schemas/user.schema"

dotenv.config()

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        private readonly mailerService: MailerService
    ) {}

    async changePass(currentPass: string, newPass: string, userId: string) {
        const user = await this.userModel.findById(userId)
        if (!user) throw new NotFoundException('User not found')

        const isPassEquals = await bcrypt.compare(currentPass, user.password)
        if (!isPassEquals) throw new UnauthorizedException('Wrong password')

        user.password = await bcrypt.hash(newPass, 10)
        await user.save()
    }

    async sendMail(email: string, emailActivationLink: string, userId: string) {
        const user = await this.userModel.findOne({ email })
        if (user) throw new BadRequestException('This e-mail already taken, try another one')

        await this.userModel.findOneAndUpdate({ _id: userId }, { email, emailActivationLink })
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Social network e-mail activation',
            html:
                `
                    <div>
                        <p>
                            Dear user,
                            <br/><br/>
                            Thank you for choosing our social network! We are happy to welcome you to our community.
                            <br/>
                            To activate your account, you need to verify your email address by following the link below: <a href="${emailActivationLink}">${emailActivationLink}</a>
                            <br/>
                            If you have not registered on our site, please ignore this email.
                            <br/>
                            If you have any questions or need additional assistance, please do not hesitate to contact our support team.
                            <br/><br/>
                            With best regards,
                            <br/>
                            The team of our social network
                        </p>
                    </div>
                `
        })
    }

    async activateEmail(emailActivationLink: string) {
        const user: UserDocument = await this.userModel.findOne({ emailActivationLink })
        if (!user) throw new BadRequestException('Invalid activation link')
        user.activatedEmail = true
        await user.save()
    }

    async cancelEmailActivation(userId: string) {
        const user: UserDocument = await this.userModel.findOne({ _id: userId })
        if (user.activatedEmail) {
            throw new BadRequestException('Email is already activated, please refresh the page')
        } else {
            user.email = null
            user.emailActivationLink = null
            await user.save()
        }
    }
}
