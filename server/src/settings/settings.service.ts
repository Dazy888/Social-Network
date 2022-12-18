import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schema
import { User, UserDocument } from "../auth/schema/user.schema"

@Injectable()
export class SettingsService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async changePass(pass: string, id: string, newPass: string): Promise<any> {
        const user = await this.userModel.findOne({id})
        const isPassEquals = await bcrypt.compare(pass, user.password)

        if (!isPassEquals) return 'Wrong password'
        return this.userModel.findByIdAndUpdate({_id: id}, {password: await bcrypt.hash(newPass, 3)})
    }

    async sendMail(email: string, activationLink: string, id: string): Promise<any> {
        const user = await this.userModel.findOne({email})

        if (user) {
            return 'User with this e-mail already exists'
        } else {
            await this.userModel.findByIdAndUpdate({_id: id}, {email, activationLink})
            return
        }
    }

    async cancelActivation(id: string): Promise<any> {
        await this.userModel.findByIdAndUpdate({_id: id}, {email: ''})
    }

    async activate(activationLink: string): Promise<any> {
        const user = await this.userModel.findOneAndUpdate({activationLink}, {isActivated: true})
        if (!user) return 'Invalid activation link'
        return
    }
}