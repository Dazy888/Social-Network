/// <reference types="multer" />
import { ProfileService } from "./profile.service";
import { ProfileIntroProps, SetProfileImageProps } from "./models/profile.models";
import { SubscriptionProps, ChangeTextProps, SetProfileInfoProps } from "./models/profile.models";
export declare function checkAccessToken(authorization: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setProfileIntro(data: ProfileIntroProps, authorization: string): Promise<void>;
    createPost(data: ChangeTextProps, authorization: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(postId: string, authorization: string): Promise<void>;
    getAvatar(id: string, authorization: string): Promise<string>;
    setProfileSettings(data: SetProfileInfoProps, authorization: string): Promise<import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setProfileImage(data: SetProfileImageProps, authorization: string, image: Express.Multer.File): Promise<{
        src: string;
        field: "banner" | "avatar";
    }>;
    follow(data: SubscriptionProps, authorization: string): Promise<void>;
    unfollow(data: SubscriptionProps, authorization: string): Promise<void>;
}
