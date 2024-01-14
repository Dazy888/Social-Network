import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPost, ProfileInfo, ProfileIntro, SetProfileImageParams, SetUserDTO } from "@/models/profile.models"
import { IUserProfile, Subscriptions } from "@/models/auth.models"

interface ProfileState {
    id: string,
    profile: IUserProfile
    posts: IPost[],
    subscriptions: Subscriptions
}

const defaultProfile = {
    banner: null,
    avatar: null,
    name: null,
    location: null,
    aboutUserText: null,
    userHobbiesText: null,
    userSkillsText: null,
}

let initialState: ProfileState = {
    id: '',
    profile: defaultProfile,
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
        setUser(state, action: PayloadAction<SetUserDTO>) {
            state.id = action.payload.id
            state.profile = action.payload.profile
            state.posts = action.payload.posts
            state.subscriptions = action.payload.subscriptions
        },
        resetUser(state) {
            state.id = ''
            state.profile = defaultProfile
            state.posts = []
            state.subscriptions = {
                followers: [],
                followings: []
            }
        },
        setProfileIntro(state, action: PayloadAction<ProfileIntro>) {
            state.profile[action.payload.field] = action.payload.text
        },
        setProfileInfo(state, action: PayloadAction<ProfileInfo>) {
            state.profile.name = action.payload.name
            state.profile.location = action.payload.location
        },
        setProfileImage(state, action: PayloadAction<SetProfileImageParams>) {
            state.profile[action.payload.field] = action.payload.src
        },
        addUserPost(state, action: PayloadAction<IPost>) {
            state.posts = [...state.posts, action.payload]
        },
        deletePost(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter((post: IPost) => post._id !== action.payload)
        }
    }
})

export const { setUser,  deletePost, addUserPost,
    setProfileIntro, setProfileImage, setProfileInfo,
    resetUser
} = profileSlice.actions
export const profileReducer = profileSlice.reducer
