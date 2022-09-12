import {AppStateType} from "../../store"

export const getUserLogin = (state: AppStateType) => {
    return state.auth.userLogin
}

export const getAuthStatus = (state: AppStateType) => {
    return state.auth.isAuth
}