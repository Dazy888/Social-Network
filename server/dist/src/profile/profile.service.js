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
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let ProfileService = class ProfileService {
    constructor(userModel, postModel) {
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async setAboutMe(aboutMe, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { aboutMe });
    }
    async setSkills(skills, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { skills });
    }
    async setHobbies(hobbies, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { hobbies });
    }
    async createPost(text, userId) {
        await this.postModel.create({ text, userId });
    }
    async deletePost(postId) {
        await this.postModel.findOneAndDelete({ postId });
    }
    async getAvatar(_id) {
        const user = await this.userModel.findOne({ _id });
        return user.avatar;
    }
    async follow(authorizedUserId, openedUserId) {
        await this.userModel.updateOne({ _id: openedUserId }, { $push: { followers: authorizedUserId } });
        await this.userModel.updateOne({ _id: authorizedUserId }, { $push: { following: openedUserId } });
    }
    async unfollow(authorizedUserId, openedUserId) {
        await this.userModel.updateOne({ _id: openedUserId }, { $pull: { followers: authorizedUserId } });
        await this.userModel.updateOne({ _id: authorizedUserId }, { $pull: { following: openedUserId } });
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