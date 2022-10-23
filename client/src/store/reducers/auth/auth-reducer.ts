import { BaseThunkType, InferActionsTypes } from '../../store'
import { AuthService } from "../../../services/AuthService"

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

type ActionsType = InferActionsTypes<typeof authActions>
type ThunkType = BaseThunkType<ActionsType>

export const authActions = {
    setAuthData: (isActivated: boolean, isAuth: boolean) => ({type: 'SN/auth/SET_AUTH_DATA', payload: {isActivated, isAuth}} as const),
}

export const authorization = (accessToken: string, isActivated: boolean) => async (dispatch: any) => {
    localStorage.setItem('token', accessToken)
    dispatch(authActions.setAuthData(isActivated, true))
}

export const logout = (): ThunkType => async (dispatch) => {
    await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(authActions.setAuthData(false, false))
}

export const checkAuth = () => async (dispatch: any) => {
    const response = await AuthService.refresh()
    if (typeof response.data === "string") return response.data

    const user = response.data.user

    localStorage.setItem('token', response.data.accessToken)
    dispatch(authActions.setAuthData(user.isActivated, true))
}