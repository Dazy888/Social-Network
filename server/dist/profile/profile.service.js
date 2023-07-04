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
const path = require("path");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let ProfileService = class ProfileService {
    constructor(userModel, profileModel, postModel, subscriptionsModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.postModel = postModel;
        this.subscriptionsModel = subscriptionsModel;
    }
    async setProfileIntro(text, field, userId) {
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: text });
    }
    async createPost(text, userId) {
        return this.postModel.create({ text, userId });
    }
    async deletePost(postId) {
        await this.postModel.findOneAndDelete({ postId });
    }
    async getAvatar(userId) {
        return this.profileModel.findOne({ userId }, { avatar: 1 });
    }
    async toggleSubscription(authorizedUserId, openedUserId, isFollow) {
        const updateQuery = isFollow ? { $push: { followers: authorizedUserId } } : { $pull: { followers: authorizedUserId } };
        const updateQuery2 = isFollow ? { $push: { following: openedUserId } } : { $pull: { following: openedUserId } };
        await this.subscriptionsModel.updateOne({ userId: openedUserId }, updateQuery);
        await this.subscriptionsModel.updateOne({ userId: authorizedUserId }, updateQuery2);
    }
    async follow(authorizedUserId, openedUserId) {
        await this.toggleSubscription(authorizedUserId, openedUserId, true);
    }
    async unfollow(authorizedUserId, openedUserId) {
        await this.toggleSubscription(authorizedUserId, openedUserId, false);
    }
    async setProfileInfo(userId, name, location) {
        return this.profileModel.findOneAndUpdate({ userId }, { name, location });
    }
    async uploadFile(file, name) {
        const storage = new storage_1.Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') });
        const bucketName = 'social-network_dazy';
        const uniqueFilename = (0, uuid_1.v4)() + '-' + name;
        const blob = storage.bucket(bucketName).file(uniqueFilename);
        const stream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        });
        await new Promise((resolve, reject) => {
            stream.on('error', reject).on('finish', resolve);
            stream.end(file.buffer);
        });
        const [signedUrl] = await blob.getSignedUrl({ action: 'read', expires: '03-01-2030' });
        return signedUrl;
    }
    async deleteFile(imagePath) {
        const storage = new storage_1.Storage({ projectId: 'central-courier-389415', keyFilename: path.join(__dirname, '..', '..', 'src', 'config', 'key.json') });
        const bucketName = 'social-network_dazy';
        const bucket = await storage.bucket(bucketName);
        const fileName = imagePath.match(/([^\/?]+)-[^\/?]+-(?:avatar|banner)/);
        if (fileName) {
            const file = await bucket.file(fileName[0]);
            await file.delete();
        }
    }
    async uploadProfileImage(userId, image, field) {
        const profile = await this.profileModel.findOne({ userId });
        await this.deleteFile(profile[field]);
        const publicLink = await this.uploadFile(image, profile.name + '-' + field);
        await this.profileModel.findOneAndUpdate({ userId }, { [field]: publicLink });
        const updatedUser = await this.profileModel.findOne({ userId });
        return { src: updatedUser[field], field };
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Profile')),
    __param(2, (0, mongoose_2.InjectModel)('Post')),
    __param(3, (0, mongoose_2.InjectModel)('Subscriptions')),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model,
        mongoose_1.Model, mongoose_1.Model])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map