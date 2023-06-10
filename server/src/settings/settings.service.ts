import * as path from "path"
import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
import { v4 } from "uuid"
import { MailerService } from "@nestjs-modules/mailer"
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Storage } from "@google-cloud/storage"
import { UserDocument } from "../schemas/user.schema"

@Injectable()
export class SettingsService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, private readonly mailerService: MailerService,) {}

    async changePass(currentPass: string, newPass: string, userId: string) {
        const user = await this.userModel.findOne({ userId })
        const isPassEquals = await bcrypt.compare(currentPass, user.password)

        if (!isPassEquals) {
            return 'Wrong password'
        } else {
            await this.userModel.findOneAndUpdate({ userId }, { password: await bcrypt.hash(newPass, 3) })
        }
    }

    async sendMail(email: string, activationLink: string, _id: string) {
        if (await this.userModel.findOne({ email })) throw new BadRequestException('User with this e-mail already exists')

        await this.userModel.findOneAndUpdate({ _id }, { email, activationLink })
        await this.mailerService.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Thank you for contacting us!',
            html:
                `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${activationLink}">${activationLink}</a>
                    </div>
                `
        })
    }

    async activate(activationLink: string) {
        if (!await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true })) throw new BadRequestException('Invalid activation link')
    }

    async cancelActivation(_id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { email: '' })
    }
    async setPhoto(newPath: string, field: string, model: any, userId: string) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId }, { avatar: `http://localhost:5000/${newPath}` }) : await model.findOneAndUpdate({ userId }, { banner: `http://localhost:5000/${newPath}` })
        return `http://localhost:5000/${newPath}`
    }

    async setName(name: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { name })
    }

    async setLocation(location: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { location })
    }

    async uploadFile(file) {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'
        const uniqueFilename = v4() + '-' + file.originalname
        const blob = storage.bucket(bucketName).file(uniqueFilename)

        const stream = blob.createWriteStream({
            resumable: false,
            metadata: { contentType: file.mimetype }
        })

        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve)
            stream.end(file.buffer)
        })

        const [metadata] = await blob.getMetadata()
        return metadata.mediaLink
    }

    async uploadImage(image: Express.Multer.File, field: string, _id: string) {
        const imageUrl = await this.uploadFile(image)
        const updateObject = { [field]: imageUrl }
        await this.userModel.findOneAndUpdate({ _id }, updateObject)
    }
}
