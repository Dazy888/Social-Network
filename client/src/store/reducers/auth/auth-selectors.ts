import {AppStateType} from "../../store"

export const getAuthStatus = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getActivatedStatus = (state: AppStateType) => {
    return state.auth.isActivated
}