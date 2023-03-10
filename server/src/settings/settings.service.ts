import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
import fs from "fs"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schema
import { UserDocument } from "@/schemas/user.schema"

@Injectable()
export class SettingsService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async changePass(currentPass: string, newPass: string, userId: string) {
        const user = await this.userModel.findOne({ userId })
        const isPassEquals = await bcrypt.compare(currentPass, user.password)

        if (!isPassEquals) {
            return 'Wrong password'
        } else {
            await this.userModel.findOneAndUpdate({ userId }, { password: await bcrypt.hash(newPass, 3) })
        }
    }

    async sendMail(email: string, activationLink: string, userId: string) {
        if (await this.userModel.findOne({email})) {
            return 'User with this e-mail already exists'
        } else {
            await this.userModel.findOneAndUpdate({ userId }, { email, activationLink })
        }
    }

    async cancelActivation(id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { email: '' })
    }

    async activate(activationLink: string) {
        if (!await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true })) return 'Invalid activation link'
    }

    async setPhoto(newPath: string, field: string, model: any, userId: string) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId }, { avatar: `http://localhost:5000/${newPath}` }) : await model.findOneAndUpdate({ userId }, { banner: `http://localhost:5000/${newPath}` })
        return `http://localhost:5000/${newPath}`
    }

    async setName(name: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { name })
        return name
    }

    async setLocation(location: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { location })
        return location
    }

    async setAvatar(newPath: string, userId: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'avatar', this.userModel, userId)
        } else {
            const previousPath = `uploads${currentPath.split('uploads')[1]}`
            fs.unlink(previousPath, (err) => err ? console.log(err) : console.log('File was deleted'))

            return this.setPhoto(newPath, 'avatar', this.userModel, userId)
        }
    }

    async setBanner(newPath: string, userId: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'banner', this.userModel, userId)
        } else {
            const lastPath = `uploads${currentPath.split('uploads')[1]}`
            fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

            return this.setPhoto(newPath, 'banner', this.userModel, userId)
        }
    }
}
