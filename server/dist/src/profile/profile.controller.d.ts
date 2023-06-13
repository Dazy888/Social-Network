import { ProfileService } from "./profile.service";
import { TextDto } from "../settings/dto/text.dto";
import { SubscriptionDto } from "./dto/subscription.dto";
export declare function checkAccessToken(token: string): void;
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    setAboutMe(data: TextDto, authorization: string): Promise<void>;
    setSkillsText(data: TextDto, authorization: string): Promise<void>;
    setHobbiesText(data: TextDto, authorization: string): Promise<void>;
    createPost(data: TextDto, authorization: string): Promise<void>;
    deletePost(id: string, postId: string, authorization: string): Promise<void>;
    getAvatar(id: string, authorization: string): Promise<string>;
    follow(data: SubscriptionDto, authorization: string): Promise<void>;
    unfollow(data: SubscriptionDto, authorization: string): Promise<void>;
}
