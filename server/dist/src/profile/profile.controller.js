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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const text_dto_1 = require("../dto/settings/text.dto");
const subscription_dto_1 = require("../dto/profile/subscription.dto");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async setAboutMeText(data) {
        const { text, userId } = data;
        return this.profileService.setAboutMe(text, userId);
    }
    async setSkillsText(data) {
        const { text, userId } = data;
        return this.profileService.setSkills(text, userId);
    }
    async setHobbiesText(data) {
        const { text, userId } = data;
        return this.profileService.setHobbies(text, userId);
    }
    async createPost(data) {
        const { text, userId } = data;
        return this.profileService.createPost(text, userId);
    }
    async deletePost(userId, postId) {
        return this.profileService.deletePost(postId, userId);
    }
    async getAvatar(userId) {
        return this.profileService.getAvatar(userId);
    }
    async follow(data) {
        return this.profileService.follow(data.authorizedUserId, data.openedUserId);
    }
    async unfollow(data) {
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId);
    }
};
__decorate([
    (0, common_1.Put)('about-me'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setAboutMeText", null);
__decorate([
    (0, common_1.Put)('skills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setSkillsText", null);
__decorate([
    (0, common_1.Put)('hobbies'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setHobbiesText", null);
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)('post/:postId/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('avatar/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Put)('follow'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "follow", null);
__decorate([
    (0, common_1.Put)('unfollow'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "unfollow", null);
ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map