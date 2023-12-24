import * as dotenv from "dotenv"
import * as bcrypt from "bcrypt"
import { Model } from "mongoose"
import { MailerService } from "@nestjs-modules/mailer"
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { UserDocument } from "../../schemas/user.schema"

dotenv.config()

@Injectable()
export class SettingsService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, private readonly mailerService: MailerService) {}

    async changePass(currentPass: string, newPass: string, _id: string) {
        const user: UserDocument = await this.userModel.findOne({ _id })

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
                        <p>
                            Dear user,
                            <br/><br/>
                            Thank you for choosing our social network! We are happy to welcome you to our community.
                            <br/>
                            To activate your account, you need to verify your email address by following the link below: <a href="${activationLink}">${activationLink}</a>
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

    async activateEmail(activationLink: string) {
        const user: UserDocument = await this.userModel.findOne({ activationLink })
        if (!user) throw new BadRequestException('Invalid activation link')
        await this.userModel.findOneAndUpdate({ id: user.id }, { isEmailActivated: true })
    }

    async cancelEmailActivation(_id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { email: null, activationLink: null })
    }
}
