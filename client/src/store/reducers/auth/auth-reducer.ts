import { InferActionsTypes } from '../../store'

let initialState = {
    isActivated: false,
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions>
export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_AUTH_DATA':
            return {
                ...state,
                isActivated: action.isActivated
            }
        default:
            return state
    }
}
export const authActions = {
    setAuthData: (isActivated: boolean) => ({type: 'SN/auth/SET_AUTH_DATA', isActivated} as const),
}