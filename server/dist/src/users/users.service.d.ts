import { Model } from "mongoose";
import { UserDocument } from "@/schemas/user.schema";
import { PostDocument } from "@/schemas/post.schema";
import { IUserPreview } from "@/interfaces/users.interfaces";
export declare class UsersService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    getUser(userId: string): Promise<{
        avatar: string;
        banner: string;
        name: string;
        location: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        followers: string[];
        following: string[];
        posts: (import("@/schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getUsers(skip: number, id: string): Promise<{
        usersData: IUserPreview[];
        length: number;
    }>;
}
