import {BaseThunkType, InferActionsTypes} from '../store';
import {IUser} from "../../models/IUser";
import {AuthService} from "../../services/AuthService";
import {$api, API_URL} from "../../http";
import axios from "axios";
import {AuthResponse} from "../../models/response/AuthResponse";

let initialState = {
    user: {} as IUser,
    isAuth: false as boolean,
};

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
                user: {...action.payload}
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    setAuthStatus: (status: boolean) => ({
        type: 'SN/auth/SET_AUTH_STATUS', status
    } as const),
    setUserData: (email: string, password: string, isActivated: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {email, password, isActivated}
    } as const)
}

export const login = (email: string, password: string) => async (dispatch: any) => {
    const response: any = await AuthService.login(email, password)

    if (response.data === 'Invalid password') {
        return {field: 'password', message: response.data}
    } else if (/User with this/.test(response.data)) {
        return {field: 'email', message: response.data}
    }

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.email, response.data.user.password, response.data.user.isActivated))
    return response.status
}

export const registration = (email: string, password: string) => async (dispatch: any) => {
    const response: any = await AuthService.registration(email, password);

    if (response.data === 'email' || response.data === 'password') {
        return {fieldName: response.data, message: `You entered invalid ${response.data}`}
    } else if (/User with this/.test(response.data)) {
        return {message: response.data}
    }

    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.email, response.data.user.password, response.data.user.isActivated))
    return response.status
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await AuthService.logout();
    localStorage.removeItem('token')
    dispatch(actions.setAuthStatus(false))
    dispatch(actions.setUserData('', '', false))
}

export const checkAuth = (): ThunkType => async (dispatch) => {
    const response = await axios.get<AuthResponse>(`${API_URL}refresh`, {withCredentials: true})
    console.log(response)
    localStorage.setItem('token', response.data.accessToken)
    dispatch(actions.setAuthStatus(true))
    dispatch(actions.setUserData(response.data.user.email, response.data.user.password, response.data.user.isActivated))
}

