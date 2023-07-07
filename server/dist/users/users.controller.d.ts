import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(skip: string, userId: string): Promise<{
        profiles: import("../schemas/profile.schema").ProfileDocument[];
        length: number;
    }>;
    getUser(userId: string): Promise<{
        posts: import("../schemas/post.schema").PostDocument[];
        subscriptions: {
            followers: string[];
            followings: string[];
        };
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
        id?: any;
        isNew: boolean;
        modelName: string;
        schema: import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
            [x: string]: any;
        }>;
    }>;
}
