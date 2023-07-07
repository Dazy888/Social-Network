/// <reference types="multer" />
import { ProfileService } from "./profile.service";
import { CreatePostDto, FollowDto, SetProfileImageDto, SetProfileInfoDto, SetProfileIntroDto } from "./dtos/profile.dtos";
export declare function checkAccessToken(authorization: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setProfileIntro(body: SetProfileIntroDto, authorization: string): Promise<void>;
    createPost(body: CreatePostDto, authorization: string): Promise<import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(postId: string, authorization: string): Promise<void>;
    getAvatar(userId: string, authorization: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setProfileSettings(body: SetProfileInfoDto, authorization: string): Promise<import("../schemas/profile.schema").Profile & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setProfileImage(body: SetProfileImageDto, authorization: string, image: Express.Multer.File): Promise<{
        src: string;
        field: import("./dtos/profile.dtos").ImageFields;
    }>;
    follow(body: FollowDto, authorization: string): Promise<void>;
    unfollow(userId: string, authorization: string): Promise<void>;
}
