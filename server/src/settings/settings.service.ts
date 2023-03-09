import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
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
}
