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
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const profile_controller_1 = require("../profile/profile.controller");
const settings_service_1 = require("./settings.service");
const settings_dtos_1 = require("./dtos/settings.dtos");
dotenv.config();
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async changePass(data, authorization) {
        (0, profile_controller_1.checkAccessToken)(authorization);
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id);
    }
    async sendMail(data, authorization) {
        (0, profile_controller_1.checkAccessToken)(authorization);
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${(0, uuid_1.v4)()}`, data.id);
    }
    async cancelActivation(id, authorization) {
        (0, profile_controller_1.checkAccessToken)(authorization);
        await this.settingsService.cancelActivation(id);
    }
    async activate(link, res, req) {
        const fullUrl = `https://${req.get('host')}${req.originalUrl}`;
        await this.settingsService.activate(fullUrl);
        res.redirect(`${process.env.CLIENT_URL}/settings/activate`);
    }
};
__decorate([
    (0, common_1.Put)('/password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dtos_1.ChangePassDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changePass", null);
__decorate([
    (0, common_1.Post)('/activate-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dtos_1.ActivateEmailDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Delete)('/cancel-activation/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "cancelActivation", null);
__decorate([
    (0, common_1.Get)('/activate/:link'),
    __param(0, (0, common_1.Param)('link')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "activate", null);
SettingsController = __decorate([
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map