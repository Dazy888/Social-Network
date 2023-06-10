import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import { PostDocument } from "../schemas/post.schema";
export declare class ProfileService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    setAboutMe(aboutMe: string, _id: string): Promise<void>;
    setSkills(skills: string, _id: string): Promise<void>;
    setHobbies(hobbies: string, _id: string): Promise<void>;
    createPost(text: string, id: string): Promise<void>;
    deletePost(postId: string): Promise<void>;
    getAvatar(_id: string): Promise<string>;
    follow(authorizedUserId: string, openedUserId: string): Promise<void>;
    unfollow(authorizedUserId: string, openedUserId: string): Promise<void>;
}
