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
exports.ProfileService = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const post_dto_1 = require("../dto/profile/post.dto");
let ProfileService = class ProfileService {
    constructor(userModel, postModel) {
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async setAboutMe(text, userId) {
        await this.userModel.findOneAndUpdate({ userId }, { aboutMe: text });
        return text;
    }
    async setSkills(text, userId) {
        await this.userModel.findOneAndUpdate({ userId }, { skills: text });
        return text;
    }
    async setHobbies(text, userId) {
        await this.userModel.findOneAndUpdate({ userId }, { hobbies: text });
        return text;
    }
    async createPost(text, userId) {
        const postModel = await this.postModel.create({ text, date: new Date(), userId, postId: (0, uuid_1.v4)() });
        return new post_dto_1.PostDto(postModel);
    }
    async deletePost(postId, userId) {
        await this.postModel.findOneAndDelete({ postId });
        return this.postModel.find({ userId });
    }
    async getAvatar(userId) {
        const user = await this.userModel.findOne({ userId });
        return user.avatar;
    }
    async follow(authorizedUserId, openedUserId) {
        const openedUser = await this.userModel.findOne({ userId: openedUserId });
        const authorizedUser = await this.userModel.findOne({ userId: authorizedUserId });
        await this.userModel.findOneAndUpdate({ userId: openedUserId }, { followers: [...openedUser.followers, authorizedUserId] });
        await this.userModel.findOneAndUpdate({ userId: authorizedUserId }, { following: [...authorizedUser.following, openedUserId] });
    }
    async unfollow(authorizedUserId, openedUserId) {
        const openedUser = await this.userModel.findOne({ userId: openedUserId });
        const authorizedUser = await this.userModel.findOne({ userId: authorizedUserId });
        const openedUserFollowers = openedUser.followers;
        const authorizedUserFollowing = authorizedUser.following;
        openedUserFollowers.splice(openedUserFollowers.indexOf(authorizedUserId), 1);
        authorizedUserFollowing.splice(authorizedUserFollowing.indexOf(openedUserId), 1);
        await this.userModel.findOneAndUpdate({ userId: openedUserId }, { followers: openedUser.followers });
        await this.userModel.findOneAndUpdate({ userId: authorizedUserId }, { following: authorizedUser.following });
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map