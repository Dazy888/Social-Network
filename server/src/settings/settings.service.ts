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
            subject: 'Dazy social network e-mail activation!',
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
        console.log(activationLink)

        const user = await this.userModel.findOne({ activationLink })

        console.log(user)

        if (!await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true })) throw new BadRequestException('Invalid activation link')
    }

    async cancelActivation(_id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { email: '', activationLink: '' })
    }

    async setName(name: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { name })
    }

    async setLocation(location: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { location })
    }

    async uploadFile(file, car?: string) {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'
        const uniqueFilename = v4() + '-' + car ? car : file.originalname
        const blob = storage.bucket(bucketName).file(uniqueFilename)

        const stream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        })

        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve)
            stream.end(file.buffer)
        })

        const [metadata] = await blob.getMetadata()
        return metadata.mediaLink
    }

    async deleteFiles(files: string[]) {
        const storage = new Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') })
        const bucketName = 'social-network_dazy'

        const bucket = await storage.bucket(bucketName)
        await Promise.all(files.map(async (value) => {
            if (value) {
                const fileName = value.match(/(?<=o\/)[^/?]+(?=\?generation)/)?.[0]
                const file = await bucket.file(fileName)
                await file.delete()
            }
        }))
    }

    async uploadImage(image: Express.Multer.File, field: 'avatar' | 'banner', _id: string) {
        const imageUrl = await this.uploadFile(image, field)
        const updateObject = { [field]: imageUrl }
        await this.userModel.findOneAndUpdate({ _id }, updateObject)
    }
}
