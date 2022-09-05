import {AppStateType} from "../store";

export const getEmail = (state: AppStateType) => {
    return state.auth.email
}

export const getAuthStatus = (state: AppStateType) => {
    return state.auth.isAuth
}