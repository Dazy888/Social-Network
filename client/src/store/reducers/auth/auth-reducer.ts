// Axios
import {AxiosResponse} from "axios"
// Types
import {BaseThunkType, InferActionsTypes} from '../../store'
// Service
import {AuthService} from "../../../services/AuthService"
import {ServerError} from "../../../pages/login/types/login-types"

let initialState = {
    userLogin: '',
    isActivated: false,
    isAuth: false,
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_AUTH_DATA':
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
    setAuthData: (userLogin: string, isActivated: boolean, isAuth: boolean) => ({type: 'SN/auth/SET_AUTH_DATA', payload: {userLogin, isActivated, isAuth}} as const),
}

export const login = (userLogin: string, password: string, token: string) => async (dispatch: any) => {
    const response: AxiosResponse & ServerError = await AuthService.login(userLogin, password, token)

    if (response.field) return response

    const user = response.data.user

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthData(user.userLogin, user.isActivated, true))
    return response.status
}

export const registration = (userLogin: string, password: string, token: string) => async (dispatch: any) => {
    let response: AxiosResponse & ServerError = await AuthService.registration(userLogin, password, token)

    if (response.field) return response

    const user = response.data.user

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthData(user.userLogin, user.isActivated, true))
    return response.status
}

export const logout = (): ThunkType => async (dispatch) => {
    await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(actions.setAuthData('', false, false))
}

export const checkAuth = (): ThunkType => async (dispatch) => {
    const response: AxiosResponse = await AuthService.refresh()
    const user = response.data.user

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthData(user.userLogin, user.isActivated, true))
}