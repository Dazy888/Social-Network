import { InferActionsTypes } from '../../store'

let initialState = {
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

export const authActions = {
    setAuthData: (isActivated: boolean, isAuth: boolean) => ({type: 'SN/auth/SET_AUTH_DATA', payload: {isActivated, isAuth}} as const),
}