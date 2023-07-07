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
const platform_express_1 = require("@nestjs/platform-express");
const profile_service_1 = require("./profile.service");
const auth_controller_1 = require("../auth/auth.controller");
const auth_service_1 = require("../auth/auth.service");
const profile_dtos_1 = require("./dtos/profile.dtos");
function checkAccessToken(authorization) {
    const accessToken = authorization.split(' ')[1];
    (0, auth_controller_1.checkToken)(accessToken);
    (0, auth_service_1.validateToken)(accessToken, process.env.JWT_ACCESS_SECRET);
}
exports.checkAccessToken = checkAccessToken;
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async setProfileIntro(body, authorization) {
        checkAccessToken(authorization);
        return this.profileService.updateIntro(body.text, body.field, body.id);
    }
    async createPost(body, authorization) {
        checkAccessToken(authorization);
        return this.profileService.createPost(body.text, body.id);
    }
    async deletePost(postId, authorization) {
        checkAccessToken(authorization);
        return this.profileService.deletePost(postId);
    }
    async getAvatar(userId, authorization) {
        checkAccessToken(authorization);
        return this.profileService.getAvatar(userId);
    }
    async setProfileSettings(body, authorization) {
        checkAccessToken(authorization);
        return this.profileService.updateInfo(body.id, body.name, body.location);
    }
    async setProfileImage(body, authorization, image) {
        checkAccessToken(authorization);
        return this.profileService.updateImage(body.id, image, body.field);
    }
    async follow(body, authorization) {
        checkAccessToken(authorization);
        return this.profileService.follow(body.authorizedUserId, body.openedUserId);
    }
    async unfollow(userId, authorization) {
        checkAccessToken(authorization);
        return this.profileService.unfollow(userId);
    }
};
__decorate([
    (0, common_1.Put)('updateIntro'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dtos_1.SetProfileIntroDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfileIntro", null);
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dtos_1.CreatePostDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)('post/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('avatar/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Put)('updateInfo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dtos_1.SetProfileInfoDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfileSettings", null);
__decorate([
    (0, common_1.Put)('updateImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dtos_1.SetProfileImageDto, String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setProfileImage", null);
__decorate([
    (0, common_1.Put)('follow'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dtos_1.FollowDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)('unfollow/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "unfollow", null);
ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map