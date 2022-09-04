import {AppStateType} from "../store";

export const getAuthStatus = (state: AppStateType) => {
    return state.auth.isAuth
}