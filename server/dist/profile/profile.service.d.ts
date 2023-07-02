/// <reference types="multer" />
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
import { Field } from "./models/profile.models";
export declare class ProfileService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    setProfileIntro(text: string, field: Field, _id: string): Promise<void>;
    createPost(text: string, userId: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(postId: string): Promise<void>;
    getAvatar(_id: string): Promise<string>;
    follow(authorizedUserId: string, openedUserId: string): Promise<void>;
    unfollow(authorizedUserId: string, openedUserId: string): Promise<void>;
    setProfileInfo(_id: string, name: string, location: string): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadFile(file: Express.Multer.File, name: string): Promise<string>;
    deleteFile(imagePath: string): Promise<void>;
    uploadProfileImage(_id: string, image: Express.Multer.File, field: 'avatar' | 'banner'): Promise<{
        src: string;
        field: "banner" | "avatar";
    }>;
}
