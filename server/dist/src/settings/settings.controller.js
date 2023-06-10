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
exports.SettingsController = void 0;
const uuid_1 = require("uuid");
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const password_dto_1 = require("../dto/settings/password.dto");
const mail_dto_1 = require("../dto/settings/mail.dto");
const text_dto_1 = require("../dto/settings/text.dto");
const photo_dto_1 = require("../dto/settings/photo.dto");
const settings_service_1 = require("./settings.service");
const mail_1 = require("./mail");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async changePass(data) {
        const { currentPass, newPass, userId } = data;
        const response = await this.settingsService.changePass(currentPass, newPass, userId);
        if (response)
            throw new common_1.BadRequestException(response);
    }
    async sendMail(data) {
        const { email, userId } = data;
        const link = (0, uuid_1.v4)();
        const response = await this.settingsService.sendMail(email, link, userId);
        if (response) {
            throw new common_1.BadRequestException(response);
        }
        else {
            await mail_1.default.sendActivationMail(email, `${process.env.API_URL}/api/settings/activate/${link}`);
        }
    }
    async cancelActivation(userId) {
        await this.settingsService.cancelActivation(userId);
    }
    async activate(link, res) {
        const response = await this.settingsService.activate(link);
        if (response) {
            throw new common_1.BadRequestException(response);
        }
        else {
            res.redirect(`${process.env.CLIENT_URL}/main/settings/activate`);
        }
    }
    async setName(data) {
        const { text, userId } = data;
        return this.settingsService.setName(text, userId);
    }
    async setLocation(data) {
        const { text, userId } = data;
        return this.settingsService.setLocation(text, userId);
    }
    async setAvatar(data, file) {
        const { userId, currentPath } = data;
        return this.settingsService.setAvatar(file[0].path, userId, currentPath);
    }
    async setBanner(data, file) {
        const { userId, currentPath } = data;
        return this.settingsService.setBanner(file[0].path, userId, currentPath);
    }
};
__decorate([
    (0, common_1.Put)('/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_dto_1.PasswordDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePass", null);
__decorate([
    (0, common_1.Post)('/mail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.MailDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Get)('/cancel-activation/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "cancelActivation", null);
__decorate([
    (0, common_1.Get)('/activate/:link'),
    __param(0, (0, common_1.Param)('link')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)('name'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setName", null);
__decorate([
    (0, common_1.Put)('location'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setLocation", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', null, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars', filename: (req, file, callback) => {
                callback(null, Date.now() + "--" + file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_dto_1.PhotoDto, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setAvatar", null);
__decorate([
    (0, common_1.Post)('banner'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 100, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/banners', filename: (req, file, callback) => {
                callback(null, Date.now() + "--" + file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_dto_1.PhotoDto, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setBanner", null);
SettingsController = __decorate([
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map