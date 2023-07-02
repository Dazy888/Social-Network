import { ProfileService } from "./profile.service";
import { SubscriptionProps, ChangeTextProps, SetProfileInfoProps } from "./models/profile.models";
import { ProfileIntroProps } from "./models/profile.models";
export declare function checkAccessToken(token: string): void;
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
    follow(data: SubscriptionProps, authorization: string): Promise<void>;
    unfollow(data: SubscriptionProps, authorization: string): Promise<void>;
}
