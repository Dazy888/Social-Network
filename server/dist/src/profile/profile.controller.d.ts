import { ProfileService } from "./profile.service";
import { TextDto } from "../settings/dto/text.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
import { ProfileIntroProps } from "./models/profile.models";
export declare function checkAccessToken(token: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setProfileIntro(data: ProfileIntroProps, authorization: string): Promise<void>;
    createPost(data: TextDto, authorization: string): Promise<void>;
    deletePost(id: string, postId: string, authorization: string): Promise<void>;
    getAvatar(id: string, authorization: string): Promise<string>;
    follow(data: SubscriptionDto, authorization: string): Promise<void>;
    unfollow(data: SubscriptionDto, authorization: string): Promise<void>;
}
