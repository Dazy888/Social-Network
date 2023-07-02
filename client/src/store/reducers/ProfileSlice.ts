import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {IPost, ProfileInfo, ProfileIntroProps, SetProfileImageProps} from "@/models/profile.models"

interface ProfileState {
    id: string,
    banner: string,
    avatar: string,
    name: string,
    location: string,
    aboutMe: string,
    hobbies: string,
    skills: string,
    posts: IPost[],
    following: string[],
    followers: string[]
}

let initialState: ProfileState = {
    id: '',
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    posts: [],
    following: [],
    followers: []
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<ProfileState>) {
            state.id = action.payload.id
            state.banner = action.payload.banner
            state.avatar = action.payload.avatar
            state.name = action.payload.name
            state.location = action.payload.location
            state.aboutMe = action.payload.aboutMe
            state.hobbies = action.payload.hobbies
            state.skills = action.payload.skills
            state.posts = action.payload.posts
            state.following = action.payload.following
            state.followers = action.payload.followers
        },
        setProfileIntro(state, action: PayloadAction<ProfileIntroProps>) {
            state[action.payload.field] = action.payload.text
        },
        setProfileImage(state, action: PayloadAction<SetProfileImageProps>) {
            state[action.payload.field] = action.payload.src
        },
        addUserPost(state, action: PayloadAction<IPost>) {
            state.posts = [...state.posts, action.payload]
        },
        deletePost(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter((post: IPost) => post.id !== action.payload);
        }
    }
})

export const { setUser,  deletePost, addUserPost, setProfileIntro,
    setProfileImage
} = profileSlice.actions
export const profileReducer = profileSlice.reducer
