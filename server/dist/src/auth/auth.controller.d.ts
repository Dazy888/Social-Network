import { AuthDto } from "../dto/auth/auth.dto";
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
            isActivated: boolean;
            name: string;
            location: string;
            avatar: string;
            banner: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            email: string;
            followers: string[];
            following: string[];
            activationLink: string;
        };
    }>;
    login(user: AuthDto): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: import("../dto/auth/user.dto").UserDto;
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: import("../dto/auth/user.dto").UserDto;
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
