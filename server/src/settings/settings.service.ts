import * as dotenv from "dotenv"
import * as path from "path"
import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
import { v4 } from "uuid"
import { MailerService } from "@nestjs-modules/mailer"
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Storage } from "@google-cloud/storage"
import { UserDocument } from "../schemas/user.schema"
import { SetProfileSettingsProps } from "./models/settings.models"

dotenv.config()

@Injectable()
export class SettingsService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, private readonly mailerService: MailerService) {}

    async changePass(currentPass: string, newPass: string, _id: string) {
        const user = await this.userModel.findOne({ _id })
        const isPassEquals = await bcrypt.compare(currentPass, user.pass)
        if (!isPassEquals) throw new BadRequestException('Wrong password')
        await this.userModel.findOneAndUpdate({ _id }, { pass: await bcrypt.hash(newPass, 10) })
    }

    async sendMail(email: string, activationLink: string, _id: string) {
        if (await this.userModel.findOne({ email })) throw new BadRequestException('This e-mail is already taken, try another one')

        await this.userModel.findOneAndUpdate({ _id }, { email, activationLink })
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Social network e-mail activation',
            html:
                `
                    <div>
                        <h3>
                            Dear user,
                            <br/>
                            Thank you for choosing our social network! We are happy to welcome you to our community.
                            <br/>
                            To activate your account, you need to verify your email address by following the link below:
                            <br/>
                            <a href="${activationLink}">${activationLink}</a>
                            <br/>
                            If you have not registered on our site, please ignore this email.
                            <br/>
                            If you have any questions or need additional assistance, please do not hesitate to contact our support team.
                            <br/>
                            With best regards,
                            <br/>
                            The team of our social network
                        </h3>
                    </div>
                `
        })
    }

    async activate(activationLink: string) {
        const user = await this.userModel.findOne({ activationLink })
        if (!user) throw new BadRequestException('Invalid email link')
        await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true })
    }

    async cancelActivation(_id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { email: '', activationLink: '' })
    }

    async uploadFile(file: Express.Multer.File, name: string): Promise<string> {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'
        const uniqueFilename = v4() + '-' + name
        const blob = storage.bucket(bucketName).file(uniqueFilename)

        const stream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        })

        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve)
            stream.end(file.buffer)
        })

        const [signedUrl] = await blob.getSignedUrl({ action: 'read', expires: '03-01-2030' })
        return signedUrl
    }

    async deleteFile(imagePath: string) {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'

        const bucket = await storage.bucket(bucketName)
        const fileName = imagePath.match(/([^\/?]+)-[^\/?]+-(?:avatar|banner)/)

        if (fileName) {
            const file = await bucket.file(fileName[0])
            await file.delete()
        }
    }

    async uploadImage(field: 'banner' | 'avatar', userName: string, image: Express.Multer.File, _id: string, lastImage: string) {
        await this.deleteFile(lastImage)
        const publicLink = await this.uploadFile(image, userName + '-' + field)
        await this.userModel.findOneAndUpdate({ _id }, { [field]: publicLink })
    }

    async setProfileSettings(_id: string, data: SetProfileSettingsProps, banner: Express.Multer.File, avatar: Express.Multer.File) {
        const user: UserDocument = await this.userModel.findOne({ _id })

        if (banner) await this.uploadImage('banner', user.name, banner, _id, user.banner)
        if (avatar) await this.uploadImage('avatar', user.name, avatar, _id, user.avatar)

        const updatedUser: UserDocument = await this.userModel.findOneAndUpdate({ _id }, {...data})
        return {
            name: updatedUser.name,
            location: updatedUser.location,
            banner: updatedUser.banner,
            avatar: updatedUser.avatar
        }
    }
}
