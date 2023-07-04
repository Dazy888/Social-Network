"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./profile.service");
const user_schema_1 = require("../schemas/user.schema");
const post_schema_1 = require("../schemas/post.schema");
const profile_schema_1 = require("../schemas/profile.schema");
const subscriptions_schema_1 = require("../schemas/subscriptions.schema");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema }, { name: 'Profile', schema: profile_schema_1.ProfileSchema },
                { name: 'Post', schema: post_schema_1.PostSchema }, { name: 'Subscriptions', schema: subscriptions_schema_1.SubscriptionsSchema }
            ])],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map