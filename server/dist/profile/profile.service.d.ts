/// <reference types="multer" />
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
import { ProfileDocument } from "../schemas/profile.schema";
import { SubscriptionsDocument } from "../schemas/subscriptions.schema";
import { ImageFields, ProfileIntroFields } from "./dtos/profile.dtos";
export declare class ProfileService {
    private userModel;
    private profileModel;
    private postModel;
    private subscriptionsModel;
    constructor(userModel: Model<UserDocument>, profileModel: Model<ProfileDocument>, postModel: Model<PostDocument>, subscriptionsModel: Model<SubscriptionsDocument>);
    setProfileIntro(text: string, field: ProfileIntroFields, userId: string): Promise<void>;
    createPost(text: string, userId: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(postId: string): Promise<void>;
    getAvatar(userId: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    toggleSubscription(authorizedUserId: string, openedUserId: string, isFollow: boolean): Promise<void>;
    follow(authorizedUserId: string, openedUserId: string): Promise<void>;
    unfollow(authorizedUserId: string, openedUserId: string): Promise<void>;
    setProfileInfo(userId: string, name: string, location: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadFile(file: Express.Multer.File, name: string): Promise<string>;
    deleteFile(imagePath: string): Promise<void>;
    uploadProfileImage(userId: string, image: Express.Multer.File, field: ImageFields): Promise<{
        src: any;
        field: ImageFields;
    }>;
}
