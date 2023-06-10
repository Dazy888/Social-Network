import { UsersService } from "@/users/users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(skip: string, userId: string): Promise<{
        usersData: import("../interfaces/users.interfaces").IUserPreview[];
        length: number;
    }>;
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
        posts: (import("../schemas/post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
