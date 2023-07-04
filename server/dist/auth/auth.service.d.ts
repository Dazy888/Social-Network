import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { TokenDocument } from "../schemas/token.schema";
import { PostDocument } from "../schemas/post.schema";
import { ProfileDocument } from "../schemas/profile.schema";
export declare const validateToken: (token: string, secret: string) => any;
export declare class AuthService {
    private userModel;
    private tokenModel;
    private postModel;
    private profileModel;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>, postModel: Model<PostDocument>, profileModel: Model<ProfileDocument>);
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
    };
    registration(userName: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
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
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
    }>;
    login(userName: string, pass: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
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
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        user: {
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
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
        posts: PostDocument[];
    }>;
}
