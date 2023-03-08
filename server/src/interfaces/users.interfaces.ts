export interface UserPreviewI {
    userId: string
    name: string
    location: string
    avatar: string
}

export interface GetUsersResI {
    usersData: UserPreviewI[],
    length: number
}

export interface PostI {
    userId: string
    date: string
    text: string
    postId: string
}

export interface GetUserResI {
    avatar: string
    banner: string
    name: string
    location: string
    aboutMe: string
    skills: string
    hobbies: string
    followers: string[]
    following: string[]
    posts: PostI[]
}
