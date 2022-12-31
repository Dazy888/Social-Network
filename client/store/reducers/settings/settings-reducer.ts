import { InferActionsTypes } from '../../store'

let initialState = {
    email: '',
}

type InitialStateType = typeof initialState
type Actions = InferActionsTypes<typeof settingsActions>
export const settingsReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'SN/settings/ACTIVATE':
            return {
                ...state,
                email: action.email
            }
        default:
            return state
    }
}
export const settingsActions = {
    setEmail: (email: string) => ({type: 'SN/settings/ACTIVATE', email} as const),
}