export interface IUserPreview {
    userId: string;
    name: string;
    location: string;
    avatar: string;
}
export interface GetUsersResponse {
    usersData: IUserPreview[];
    length: number;
}
export interface IPost {
    userId: string;
    date: string;
    text: string;
    postId: string;
}
export interface GetUserResponse {
    avatar: string;
    banner: string;
    name: string;
    location: string;
    aboutMe: string;
    skills: string;
    hobbies: string;
    followers: string[];
    following: string[];
    posts: IPost[];
}
