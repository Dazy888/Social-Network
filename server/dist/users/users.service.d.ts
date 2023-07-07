import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
import { ProfileDocument } from "../schemas/profile.schema";
import { SubscriptionDocument } from "../schemas/subscription.schema";
export declare class UsersService {
    private userModel;
    private profileModel;
    private postModel;
    private subscriptionsModel;
    constructor(userModel: Model<UserDocument>, profileModel: Model<ProfileDocument>, postModel: Model<PostDocument>, subscriptionsModel: Model<SubscriptionDocument>);
    getUsers(skip: number, userId: string): Promise<{
        profiles: ProfileDocument[];
        length: number;
    }>;
    getUser(userId: string): Promise<{
        posts: PostDocument[];
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
        schema: import("mongoose").Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
            [x: string]: any;
        }>;
    }>;
}
