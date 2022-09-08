// Axios
import {AxiosResponse} from "axios"
// Types
import {BaseThunkType, InferActionsTypes} from '../store'
// Service
import {AuthService} from "../../services/AuthService"
import {ServerError} from "../../pages/login/types/login-types";

let initialState = {
    email: '' as string,
    isActivated: false as boolean,
    isAuth: false as boolean,
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_AUTH_STATUS':
            return {
                ...state,
                isAuth: action.status
            }
        case 'SN/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    setAuthStatus: (status: boolean) => ({type: 'SN/auth/SET_AUTH_STATUS', status} as const),
    setUserData: (email: string, isActivated: boolean) => ({type: 'SN/auth/SET_USER_DATA', payload: {email, isActivated}} as const)
}

export const login = (login: string, password: string, token: string) => async (dispatch: any) => {
    const response: AxiosResponse & ServerError = await AuthService.login(login, password, token)

    if (response.field) return response

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.login, response.data.user.isActivated))
    return response.status
}

export const registration = (login: string, password: string, token: string) => async (dispatch: any) => {
    let response: AxiosResponse & ServerError = await AuthService.registration(login, password, token)

    if (response.field) return response

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.login, response.data.user.isActivated))
    return response.status
}

export const logout = (): ThunkType => async (dispatch) => {
    await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(actions.setAuthStatus(false))
    dispatch(actions.setUserData('',  false))
}

export const checkAuth = (): ThunkType => async (dispatch) => {
    const response: AxiosResponse = await AuthService.refresh()
    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.email, response.data.user.isActivated))
}

