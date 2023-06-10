import { Model } from "mongoose";
import { UserDto } from "../dto/auth/user.dto";
import { User } from "../interfaces/auth.interfaces";
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
    createUser(user: User): {
        isActivated: boolean;
        name: string;
        location: string;
        avatar: string;
        banner: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        email: string;
        followers: string[];
        following: string[];
        activationLink: string;
    };
    registration(login: string, password: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            isActivated: boolean;
            name: string;
            location: string;
            avatar: string;
            banner: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            email: string;
            followers: string[];
            following: string[];
            activationLink: string;
        };
    }>;
    login(login: string, password: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: UserDto;
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: UserDto;
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
