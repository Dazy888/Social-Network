import { Model } from "mongoose";
import { UserPreview } from "../models/main.models";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
export declare class UsersService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    getUsers(skip: number, id: string): Promise<{
        usersData: UserPreview[];
        length: number;
    }>;
    getUser(_id: string): Promise<{
        avatar: string;
        banner: string;
        name: string;
        location: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        followers: string[];
        following: string[];
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
