import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
export declare function checkToken(token: string): void;
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registration(user: AuthDto): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
    }>;
    login(user: AuthDto): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        user: {
            id: any;
            isActivated: boolean;
            activationLink: string;
            email: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            followers: string[];
            following: string[];
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
