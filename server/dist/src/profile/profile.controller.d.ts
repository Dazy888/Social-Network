import { ProfileService } from "./profile.service";
import { TextDto } from "../settings/dto/text.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
export declare function checkAccessToken(token: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setAboutMe(data: TextDto, accessToken: string): Promise<void>;
    setSkillsText(data: TextDto, accessToken: string): Promise<void>;
    setHobbiesText(data: TextDto, accessToken: string): Promise<void>;
    createPost(data: TextDto, accessToken: string): Promise<void>;
    deletePost(id: string, postId: string, accessToken: string): Promise<void>;
    getAvatar(id: string, accessToken: string): Promise<string>;
    follow(data: SubscriptionDto, accessToken: string): Promise<void>;
    unfollow(data: SubscriptionDto, accessToken: string): Promise<void>;
}
