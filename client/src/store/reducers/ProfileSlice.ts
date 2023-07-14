import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPost, ProfileInfo, ProfileIntro, SetProfileImageParams } from "@/models/profile.models"
import { Subscriptions } from "@/models/auth.models"

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
    subscriptions: Subscriptions
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
    subscriptions: {
        followers: [],
        followings: []
    }
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
            state.subscriptions = action.payload.subscriptions
        },
        resetUser(state, action) {
            state.id = ''
            state.banner = ''
            state.avatar = ''
            state.name = ''
            state.location = ''
            state.aboutMe = ''
            state.hobbies = ''
            state.skills = ''
            state.posts = []
            state.subscriptions = {
                followers: [],
                followings: []
            }
        },
        setProfileIntro(state, action: PayloadAction<ProfileIntro>) {
            state[action.payload.field] = action.payload.text
        },
        setProfileInfo(state, action: PayloadAction<ProfileInfo>) {
            state.name = action.payload.name
            state.location = action.payload.location
        },
        setProfileImage(state, action: PayloadAction<SetProfileImageParams>) {
            state[action.payload.field] = action.payload.src
        },
        addUserPost(state, action: PayloadAction<IPost>) {
            state.posts = [...state.posts, action.payload]
        },
        deletePost(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter((post: IPost) => post._id !== action.payload)
        }
    }
})

export const { setUser,  deletePost, addUserPost, setProfileIntro,
    setProfileImage, setProfileInfo, resetUser
} = profileSlice.actions
export const profileReducer = profileSlice.reducer
