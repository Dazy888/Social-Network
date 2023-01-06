import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schema
import { User, UserDocument } from "../auth/schemas/user.schema"

@Injectable()
export class SettingsService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async changePass(pass: string, id: string, newPass: string): Promise<any> {
        const user = await this.userModel.findOne({userId: id})
        const isPassEquals = await bcrypt.compare(pass, user.password)
        if (!isPassEquals) return 'Wrong password'
        return this.userModel.findOneAndUpdate({userId: id}, {password: await bcrypt.hash(newPass, 3)})
    }
    async sendMail(email: string, activationLink: string, id: string): Promise<any> {
        if (await this.userModel.findOne({email})) {
            return 'User with this e-mail already exists'
        } else {
            return this.userModel.findByIdAndUpdate({_id: id}, {email, activationLink})
        }
    }
    async cancelActivation(id: string): Promise<any> {
        await this.userModel.findOneAndUpdate({userId: id}, {email: ''})
    }
    async activate(activationLink: string): Promise<any> {
        if (!await this.userModel.findOneAndUpdate({activationLink}, {isActivated: true})) {
            return 'Invalid activation link'
        } else {
            return
        }
    }
}