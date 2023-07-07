import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { TokenDocument } from "../schemas/token.schema";
import { PostDocument } from "../schemas/post.schema";
import { ProfileDocument } from "../schemas/profile.schema";
import { SubscriptionDocument } from "../schemas/subscription.schema";
export declare const validateToken: (token: string, secret: string) => any;
export declare class AuthService {
    private usersModel;
    private tokensModel;
    private postsModel;
    private profilesModel;
    private subscriptionsModel;
    constructor(usersModel: Model<UserDocument>, tokensModel: Model<TokenDocument>, postsModel: Model<PostDocument>, profilesModel: Model<ProfileDocument>, subscriptionsModel: Model<SubscriptionDocument>);
    generateTokens(payload: any): {
        accessToken: any;
        refreshToken: any;
    };
    saveToken(userId: string, refreshToken: string): Promise<void>;
    registration(userName: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            id: any;
            isEmailActivated: boolean;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
        };
    }>;
    getUserData(id: string, isEmailActivated: boolean, email: string | null): Promise<{
        posts: PostDocument[];
        subscriptions: {
            followers: string[];
            followings: string[];
        };
        userId: string;
        name: string;
        location: string;
        banner: string;
        avatar: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        _id?: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "remove" | "save" | "validate";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id: any;
        isNew: boolean;
        modelName: string;
        schema: import("mongoose").Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
            [x: string]: any;
        }>;
        isEmailActivated: boolean;
        email: string;
    }>;
    login(userName: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            posts: PostDocument[];
            subscriptions: {
                followers: string[];
                followings: string[];
            };
            userId: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            _id?: any;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id: any;
            isNew: boolean;
            modelName: string;
            schema: import("mongoose").Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
                [x: string]: any;
            }>;
            isEmailActivated: boolean;
            email: string;
        };
    }>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        user: {
            posts: PostDocument[];
            subscriptions: {
                followers: string[];
                followings: string[];
            };
            userId: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            _id?: any;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id: any;
            isNew: boolean;
            modelName: string;
            schema: import("mongoose").Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
                [x: string]: any;
            }>;
            isEmailActivated: boolean;
            email: string;
        };
    }>;
}
