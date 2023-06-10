export interface User {
    isActivated: boolean;
    name: string;
    location: string;
    banner: string;
    avatar: string;
    aboutMe: string;
    skills: string;
    hobbies: string;
    email: string | null;
    followers: string[];
    following: string[];
    activationLink: string | null;
}
