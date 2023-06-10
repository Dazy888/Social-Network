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
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const storage_1 = require("@google-cloud/storage");
let SettingsService = class SettingsService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    async changePass(currentPass, newPass, userId) {
        const user = await this.userModel.findOne({ userId });
        const isPassEquals = await bcrypt.compare(currentPass, user.password);
        if (!isPassEquals) {
            return 'Wrong password';
        }
        else {
            await this.userModel.findOneAndUpdate({ userId }, { password: await bcrypt.hash(newPass, 3) });
        }
    }
    async sendMail(email, activationLink, _id) {
        if (await this.userModel.findOne({ email }))
            throw new common_1.BadRequestException('User with this e-mail already exists');
        await this.userModel.findOneAndUpdate({ _id }, { email, activationLink });
        await this.mailerService.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Thank you for contacting us!',
            html: `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${activationLink}">${activationLink}</a>
                    </div>
                `
        });
    }
    async activate(activationLink) {
        if (!await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true }))
            throw new common_1.BadRequestException('Invalid activation link');
    }
    async cancelActivation(_id) {
        await this.userModel.findOneAndUpdate({ _id }, { email: '' });
    }
    async setPhoto(newPath, field, model, userId) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId }, { avatar: `http://localhost:5000/${newPath}` }) : await model.findOneAndUpdate({ userId }, { banner: `http://localhost:5000/${newPath}` });
        return `http://localhost:5000/${newPath}`;
    }
    async setName(name, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { name });
    }
    async setLocation(location, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { location });
    }
    async uploadFile(file) {
        const storage = new storage_1.Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') });
        const bucketName = 'social-network_dazy';
        const uniqueFilename = (0, uuid_1.v4)() + '-' + file.originalname;
        const blob = storage.bucket(bucketName).file(uniqueFilename);
        const stream = blob.createWriteStream({
            resumable: false,
            metadata: { contentType: file.mimetype }
        });
        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve);
            stream.end(file.buffer);
        });
        const [metadata] = await blob.getMetadata();
        return metadata.mediaLink;
    }
    async uploadImage(image, field, _id) {
        const imageUrl = await this.uploadFile(image);
        const updateObject = { [field]: imageUrl };
        await this.userModel.findOneAndUpdate({ _id }, updateObject);
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model, mailer_1.MailerService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map