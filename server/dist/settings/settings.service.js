"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
dotenv.config();
let SettingsService = class SettingsService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    async changePass(currentPass, newPass, _id) {
        const user = await this.userModel.findOne({ _id });
        const isPassEquals = await bcrypt.compare(currentPass, user.pass);
        if (!isPassEquals)
            throw new common_1.BadRequestException('Wrong password');
        await this.userModel.findOneAndUpdate({ _id }, { pass: await bcrypt.hash(newPass, 10) });
    }
    async sendMail(email, activationLink, _id) {
        if (await this.userModel.findOne({ email }))
            throw new common_1.BadRequestException('This e-mail is already taken, try another one');
        await this.userModel.findOneAndUpdate({ _id }, { email, activationLink });
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Social network e-mail activation',
            html: `
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
        });
    }
    async activate(activationLink) {
        const user = await this.userModel.findOne({ activationLink });
        if (!user)
            throw new common_1.BadRequestException('Invalid email link');
        await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true });
    }
    async cancelActivation(_id) {
        await this.userModel.findOneAndUpdate({ _id }, { email: '', activationLink: '' });
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model, mailer_1.MailerService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map