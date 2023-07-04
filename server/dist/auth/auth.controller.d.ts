import { AuthDto } from "./dtos/auth.dto";
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
            userId: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            _id?: any;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id: any;
            isNew: boolean;
            modelName: string;
            schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
                [x: string]: any;
            }>;
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
    }>;
    login(user: AuthDto): Promise<{
        tokens: {
            accessToken: any;
            refreshToken: any;
        };
        user: {
            userId: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            _id?: any;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id: any;
            isNew: boolean;
            modelName: string;
            schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
                [x: string]: any;
            }>;
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    logout(refreshToken: string): Promise<import("mongodb").DeleteResult>;
    refresh(refreshToken: string): Promise<{
        accessToken: any;
        user: {
            userId: string;
            name: string;
            location: string;
            banner: string;
            avatar: string;
            aboutMe: string;
            skills: string;
            hobbies: string;
            _id?: any;
            __v?: any;
            $locals: Record<string, unknown>;
            $op: "remove" | "save" | "validate";
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection<import("bson").Document>;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id: any;
            isNew: boolean;
            modelName: string;
            schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
                [x: string]: any;
            }>;
            isActivated: boolean;
            activationLink: string;
            email: string;
        };
        posts: import("../schemas/post.schema").PostDocument[];
    }>;
}
