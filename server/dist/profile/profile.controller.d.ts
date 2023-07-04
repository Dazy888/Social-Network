/// <reference types="multer" />
import { ProfileService } from "./profile.service";
import { CreatePostDto, SetProfileImageDto, SetProfileInfoDto, SetProfileIntroDto, SetSubscriptionDto } from "./dtos/profile.dtos";
export declare function checkAccessToken(authorization: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setProfileIntro(data: SetProfileIntroDto, authorization: string): Promise<void>;
    createPost(data: CreatePostDto, authorization: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(postId: string, authorization: string): Promise<void>;
    getAvatar(id: string, authorization: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setProfileSettings(data: SetProfileInfoDto, authorization: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setProfileImage(data: SetProfileImageDto, authorization: string, image: Express.Multer.File): Promise<{
        src: any;
        field: import("./dtos/profile.dtos").ImageFields;
    }>;
    follow(data: SetSubscriptionDto, authorization: string): Promise<void>;
    unfollow(data: SetSubscriptionDto, authorization: string): Promise<void>;
}
