/// <reference types="multer" />
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
import { ProfileDocument } from "../schemas/profile.schema";
import { SubscriptionDocument } from "../schemas/subscription.schema";
import { ImageFields, ProfileIntroFields } from "./dtos/profile.dtos";
export declare class ProfileService {
    private userModel;
    private profileModel;
    private postModel;
    private subscriptionsModel;
    private readonly storage;
    private readonly bucketName;
    constructor(userModel: Model<UserDocument>, profileModel: Model<ProfileDocument>, postModel: Model<PostDocument>, subscriptionsModel: Model<SubscriptionDocument>);
    updateIntro(text: string, field: ProfileIntroFields, userId: string): Promise<void>;
    createPost(text: string, userId: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(id: string): Promise<void>;
    getAvatar(userId: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateInfo(userId: string, name: string, location: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadFile(file: Express.Multer.File, name: string): Promise<string>;
    deleteFile(imagePath: string): Promise<void>;
    updateImage(userId: string, image: Express.Multer.File, field: ImageFields): Promise<{
        src: string;
        field: ImageFields;
    }>;
    follow(authorizedUserId: string, openedUserId: string): Promise<void>;
    unfollow(userId: string): Promise<void>;
}
