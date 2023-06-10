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
exports.SettingsService = void 0;
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let SettingsService = class SettingsService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async changePass(currentPass, newPass, userId) {
        const user = await this.userModel.findOne({ userId });
        const isPassEquals = await bcrypt.compare(currentPass, user.password);
        if (!isPassEquals) {
            return 'Wrong password';
        }
        else {
            await this.userModel.findOneAndUpdate({ userId }, { password: await bcrypt.hash(newPass, 3) });
        }
    }
    async sendMail(email, activationLink, userId) {
        if (await this.userModel.findOne({ email })) {
            return 'User with this e-mail already exists';
        }
        else {
            await this.userModel.findOneAndUpdate({ userId }, { email, activationLink });
        }
    }
    async cancelActivation(id) {
        await this.userModel.findOneAndUpdate({ userId: id }, { email: '' });
    }
    async activate(activationLink) {
        if (!await this.userModel.findOneAndUpdate({ activationLink }, { isActivated: true }))
            return 'Invalid activation link';
    }
    async setPhoto(newPath, field, model, userId) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId }, { avatar: `http://localhost:5000/${newPath}` }) : await model.findOneAndUpdate({ userId }, { banner: `http://localhost:5000/${newPath}` });
        return `http://localhost:5000/${newPath}`;
    }
    async setName(name, userId) {
        await this.userModel.findOneAndUpdate({ userId }, { name });
        return name;
    }
    async setLocation(location, userId) {
        await this.userModel.findOneAndUpdate({ userId }, { location });
        return location;
    }
    async setAvatar(newPath, userId, currentPath) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'avatar', this.userModel, userId);
        }
        else {
            const previousPath = `uploads${currentPath.split('uploads')[1]}`;
            fs_1.default.unlink(previousPath, (err) => err ? console.log(err) : console.log('File was deleted'));
            return this.setPhoto(newPath, 'avatar', this.userModel, userId);
        }
    }
    async setBanner(newPath, userId, currentPath) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'banner', this.userModel, userId);
        }
        else {
            const lastPath = `uploads${currentPath.split('uploads')[1]}`;
            fs_1.default.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'));
            return this.setPhoto(newPath, 'banner', this.userModel, userId);
        }
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map