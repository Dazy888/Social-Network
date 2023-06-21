/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { TokenDocument } from "../schemas/token.schema";
import { PostDocument } from "../schemas/post.schema";
export declare const validateToken: (token: string, secret: string) => any;
export declare class AuthService {
    private userModel;
    private tokenModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>, postModel: Model<PostDocument>);
    generateTokens(payload: any): {
        accessToken: any;
        refreshToken: any;
    };
    saveToken(userId: string, refreshToken: string): Promise<void>;
    createUser(user: UserDocument): {
        id: any;
        isActivated: boolean;
        activationLink: string;
        email: string;
        name: string;
        location: string;
        banner: string;
        avatar: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        followers: string[];
        following: string[];
    };
    registration(login: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
    }>;
    login(login: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
