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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel, profileModel, postModel, subscriptionsModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.postModel = postModel;
        this.subscriptionsModel = subscriptionsModel;
    }
    async getUsers(skip, userId) {
        const length = await this.profileModel.count();
        const profiles = await this.profileModel.find({ userId: { $ne: userId } }, { userId: 1, name: 1, location: 1, avatar: 1, _id: 0 }).skip(skip).limit(20);
        return { profiles, length };
    }
    async getUser(userId) {
        const profile = await this.profileModel.findOne({ userId }, { name: 1, location: 1, avatar: 1, banner: 1, aboutMe: 1, skills: 1, hobbies: 1, _id: 0 });
        const posts = await this.postModel.find({ userId });
        const followers = await this.subscriptionsModel.find({ followedUserId: userId }, { userId: 1, _id: 0 });
        const followings = await this.subscriptionsModel.find({ userId }, { followedUserId: 1, _id: 0 });
        const followersIds = followers.map((follower) => follower.userId);
        const followingsIds = followings.map((following) => following.followedUserId);
        return Object.assign(Object.assign({}, profile), { posts, subscriptions: {
                followers: followersIds,
                followings: followingsIds
            } });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Profile')),
    __param(2, (0, mongoose_1.InjectModel)('Post')),
    __param(3, (0, mongoose_1.InjectModel)('Subscriptions')),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model,
        mongoose_2.Model, mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map