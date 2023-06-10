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
exports.ProfileController = exports.checkAccessToken = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const text_dto_1 = require("../settings/dto/text.dto");
const subscription_dto_1 = require("./dto/subscription.dto");
const auth_controller_1 = require("../auth/auth.controller");
const auth_service_1 = require("../auth/auth.service");
function checkAccessToken(token) {
    (0, auth_controller_1.checkToken)(token);
    (0, auth_service_1.validateToken)(token, process.env.JWT_ACCESS_SECRET);
}
exports.checkAccessToken = checkAccessToken;
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async setAboutMe(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.setAboutMe(data.text, data.id);
    }
    async setSkillsText(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.setSkills(data.text, data.id);
    }
    async setHobbiesText(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.setHobbies(data.text, data.id);
    }
    async createPost(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.createPost(data.text, data.id);
    }
    async deletePost(id, postId, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.deletePost(postId);
    }
    async getAvatar(id, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.getAvatar(id);
    }
    async follow(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.follow(data.authorizedUserId, data.openedUserId);
    }
    async unfollow(data, accessToken) {
        checkAccessToken(accessToken);
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId);
    }
};
__decorate([
    (0, common_1.Put)('about-me/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setAboutMe", null);
__decorate([
    (0, common_1.Put)('skills/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setSkillsText", null);
__decorate([
    (0, common_1.Put)('hobbies/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setHobbiesText", null);
__decorate([
    (0, common_1.Post)('post/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)('post/:postId/:id/:accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('avatar/:id/:accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Put)('follow/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "follow", null);
__decorate([
    (0, common_1.Put)('unfollow/:accessToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "unfollow", null);
ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map