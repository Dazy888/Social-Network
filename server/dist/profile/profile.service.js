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
    constructor(userModel, postModel) {
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async setProfileIntro(text, field, _id) {
        await this.userModel.findOneAndUpdate({ _id }, { [field]: text });
    }
    async createPost(text, userId) {
        return this.postModel.create({ text, userId });
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
    async setProfileInfo(_id, name, location) {
        return this.userModel.findOneAndUpdate({ _id }, { name, location });
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
    async uploadProfileImage(_id, image, field) {
        const user = await this.userModel.findOne({ _id });
        await this.deleteFile(user[field]);
        const publicLink = await this.uploadFile(image, user.name + '-' + field);
        await this.userModel.findOneAndUpdate({ _id }, { [field]: publicLink });
        const updatedUser = await this.userModel.findOne({ _id });
        return { src: updatedUser[field], field };
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