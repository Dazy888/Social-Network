import {AppStateType} from "../../store"

export const getBanner = (state: AppStateType) => {
    return state.profile.banner
}

export const getAvatar = (state: AppStateType) => {
    return state.profile.avatar
}

export const getUserName = (state: AppStateType) => {
    return state.profile.name
}

export const getUserLocation = (state: AppStateType) => {
    return state.profile.location
}