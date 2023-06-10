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
import { UserDocument } from "@/schemas/user.schema";
import { PostDocument } from "@/schemas/post.schema";
import { PostDto } from "@/dto/profile/post.dto";
export declare class ProfileService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    setAboutMe(text: string, userId: string): Promise<string>;
    setSkills(text: string, userId: string): Promise<string>;
    setHobbies(text: string, userId: string): Promise<string>;
    createPost(text: string, userId: string): Promise<PostDto>;
    deletePost(postId: string, userId: string): Promise<(import("@/schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getAvatar(userId: string): Promise<string>;
    follow(authorizedUserId: string, openedUserId: string): Promise<void>;
    unfollow(authorizedUserId: string, openedUserId: string): Promise<void>;
}
