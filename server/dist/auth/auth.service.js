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
exports.AuthService = exports.validateToken = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const validateToken = (token, secret) => jwt.verify(token, secret);
exports.validateToken = validateToken;
let AuthService = class AuthService {
    constructor(usersModel, tokensModel, postsModel, profilesModel, subscriptionsModel) {
        this.usersModel = usersModel;
        this.tokensModel = tokensModel;
        this.postsModel = postsModel;
        this.profilesModel = profilesModel;
        this.subscriptionsModel = subscriptionsModel;
    }
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    async saveToken(userId, refreshToken) {
        await this.tokensModel.create({ userId, refreshToken });
    }
    async registration(userName, pass) {
        const existingUser = await this.usersModel.findOne({ userName });
        if (existingUser)
            throw new common_1.BadRequestException('User with this login already exists');
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = await this.usersModel.create({ userName, pass: hashedPassword, });
        const userNumber = Math.floor(Math.random() * 100);
        const profile = await this.profilesModel.create({ name: `User_${userNumber}`, userId: user.id });
        const tokens = this.generateTokens({ id: user.id });
        await this.saveToken(user.id, tokens.refreshToken);
        return {
            tokens,
            user: {
                id: user.id,
                isEmailActivated: user.isEmailActivated,
                email: user.email,
                name: profile.name,
                location: profile.location,
                banner: profile.banner,
                avatar: profile.avatar,
                aboutMe: profile.aboutMe,
                skills: profile.skills,
                hobbies: profile.hobbies,
            }
        };
    }
    async getUserData(id, isEmailActivated, email) {
        const profile = await this.profilesModel.findOne({ userId: id }, { name: 1, location: 1, avatar: 1, banner: 1, aboutMe: 1, skills: 1, hobbies: 1, _id: 0 }).lean();
        const posts = await this.postsModel.find({ userId: id });
        const followers = await this.subscriptionsModel.find({ followedUserId: id }, { userId: 1, _id: 0 });
        const followings = await this.subscriptionsModel.find({ userId: id }, { followedUserId: 1, _id: 0 });
        const followersIds = followers.map((follower) => follower.userId);
        const followingsIds = followings.map((following) => following.followedUserId);
        return Object.assign(Object.assign({ id, isEmailActivated, email }, profile), { posts, subscriptions: { followers: followersIds, followings: followingsIds } });
    }
    async login(userName, pass) {
        const user = await this.usersModel.findOne({ userName });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid login or password');
        const isPassEquals = await bcrypt.compare(pass, user.pass);
        if (!isPassEquals)
            throw new common_1.UnauthorizedException('Invalid login or password');
        const tokens = this.generateTokens({ id: user.id });
        await this.saveToken(user.id, tokens.refreshToken);
        const userData = await this.getUserData(user.id, user.isEmailActivated, user.email);
        return { tokens, user: userData };
    }
    async logout(refreshToken) {
        await this.tokensModel.deleteOne({ refreshToken });
    }
    async refresh(refreshToken) {
        const { id } = (0, exports.validateToken)(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenFromDb = await this.tokensModel.findOne({ refreshToken });
        if (!id || !tokenFromDb)
            throw new common_1.BadRequestException('User is not authorized');
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await this.tokensModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
        const user = await this.usersModel.findOne({ id }, { isEmailActivated: 1, email: 1, _id: 0 }).lean();
        const userData = await this.getUserData(id, user.isEmailActivated, user.email);
        return {
            accessToken: jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: userData
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Token')),
    __param(2, (0, mongoose_2.InjectModel)('Post')),
    __param(3, (0, mongoose_2.InjectModel)('Profile')),
    __param(4, (0, mongoose_2.InjectModel)('Subscription')),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model,
        mongoose_1.Model, mongoose_1.Model,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map