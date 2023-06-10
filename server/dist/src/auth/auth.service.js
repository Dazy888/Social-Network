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
const dotenv = require("dotenv");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dto/auth/user.dto");
dotenv.config();
const validateToken = (token, secret) => jwt.verify(token, secret);
exports.validateToken = validateToken;
let AuthService = class AuthService {
    constructor(userModel, tokenModel, postModel) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
        this.postModel = postModel;
    }
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    async saveToken(userId, refreshToken) {
        await this.tokenModel.create({ userId, refreshToken });
    }
    createUser(user) {
        return {
            isActivated: user.isActivated,
            name: user.name,
            location: user.location,
            avatar: user.avatar,
            banner: user.banner,
            aboutMe: user.aboutMe,
            skills: user.skills,
            hobbies: user.hobbies,
            email: user.email,
            followers: user.followers,
            following: user.following,
            activationLink: user.activationLink
        };
    }
    async registration(login, password) {
        const existingUser = await this.userModel.findOne({ login });
        if (existingUser)
            throw new common_1.BadRequestException('User with this login already exists');
        const hashPassword = await bcrypt.hash(password, 10);
        const userNumber = Math.floor(Math.random() * 100);
        const user = await this.userModel.create({ login, password: hashPassword, name: `User ${userNumber}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: 'This project was made by David Hutsenko', skills: 'This project was made by David Hutsenko', hobbies: 'This project was made by David Hutsenko', isActivated: false, email: null, followers: [], following: [], activationLink: null });
        const userDto = new user_dto_1.UserDto(user);
        const tokens = this.generateTokens(Object.assign({}, userDto));
        await this.saveToken(user.id, tokens.refreshToken);
        return { tokens, user: this.createUser(userDto) };
    }
    async login(login, password) {
        const existingUser = await this.userModel.findOne({ login });
        if (!existingUser) {
            throw new common_1.UnauthorizedException("User with this login doesn't exist");
        }
        else {
            const userDto = new user_dto_1.UserDto(existingUser);
            const isPassEquals = await bcrypt.compare(password, existingUser.password);
            if (!isPassEquals) {
                throw new common_1.UnauthorizedException('Wrong password');
            }
            else {
                const posts = await this.postModel.find({ userId: existingUser.id });
                const tokens = this.generateTokens(Object.assign({}, userDto));
                await this.saveToken(existingUser.id, tokens.refreshToken);
                return { tokens, user: userDto, posts };
            }
        }
    }
    async logout(refreshToken) {
        return this.tokenModel.deleteOne({ refreshToken });
    }
    async refresh(refreshToken) {
        const userData = (0, exports.validateToken)(refreshToken, process.env.JWT_REFRESH_SECRET);
        const tokenFromDb = await this.tokenModel.findOne({ refreshToken });
        if (!userData || !tokenFromDb)
            throw new common_1.BadRequestException('User is not authorized');
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await this.tokenModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
        const user = await this.userModel.findOne({ userId: userData.id });
        const posts = await this.postModel.find({ userId: userData.id });
        const userDto = new user_dto_1.UserDto(user);
        const tokens = this.generateTokens(Object.assign({}, userDto));
        return { tokens, user: userDto, posts };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Token')),
    __param(2, (0, mongoose_2.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model, mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map