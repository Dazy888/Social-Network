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
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const profile_controller_1 = require("../profile/profile.controller");
const settings_service_1 = require("./settings.service");
const password_dto_1 = require("./dto/password.dto");
const mail_dto_1 = require("./dto/mail.dto");
const text_dto_1 = require("./dto/text.dto");
const photo_dto_1 = require("./dto/photo.dto");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async changePass(data, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id);
    }
    async sendMail(data, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${(0, uuid_1.v4)()}`, data.id);
    }
    async activate(link, res) {
        await this.settingsService.activate(link);
        res.redirect(`${process.env.CLIENT_URL}/main/settings/activate`);
    }
    async cancelActivation(id, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        await this.settingsService.cancelActivation(id);
    }
    async setName(data, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.setName(data.text, data.id);
    }
    async setLocation(data, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.setLocation(data.text, data.id);
    }
    async setAvatar(data, image, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.uploadImage(image, 'avatar', data.id);
    }
    async setBanner(data, image, authorization) {
        const accessToken = authorization.split(' ')[1];
        (0, profile_controller_1.checkAccessToken)(accessToken);
        return this.settingsService.uploadImage(image, 'banner', data.id);
    }
};
__decorate([
    (0, common_1.Put)('/pass'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_dto_1.PasswordDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePass", null);
__decorate([
    (0, common_1.Post)('/mail'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mail_dto_1.MailDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Get)('/activate/:link'),
    __param(0, (0, common_1.Param)('link')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "activate", null);
__decorate([
    (0, common_1.Get)('/cancel-activation/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "cancelActivation", null);
__decorate([
    (0, common_1.Put)('name'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setName", null);
__decorate([
    (0, common_1.Put)('location'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setLocation", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_dto_1.PhotoDto, Object, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setAvatar", null);
__decorate([
    (0, common_1.Post)('banner'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_dto_1.PhotoDto, Object, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setBanner", null);
SettingsController = __decorate([
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map