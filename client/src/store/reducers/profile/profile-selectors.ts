import {AppStateType} from "../../store"

export const getBanner = (state: AppStateType) => {
    return state.profile.banner
}

export const getAvatar = (state: AppStateType) => {
    return state.profile.avatar
}

export const getName = (state: AppStateType) => {
    return state.profile.name
}

export const getLocation = (state: AppStateType) => {
    return state.profile.location
}

export const getAboutMe = (state: AppStateType) => {
    return state.profile.aboutMe
}

export const getSkills = (state: AppStateType) => {
    return state.profile.skills
}

export const getHobbies = (state: AppStateType) => {
    return state.profile.hobbies
}

export const getId = (state: AppStateType) => {
    return state.profile.id
}

export const getPosts = (state: AppStateType) => {
    return state.profile.posts
}