import { InferActionsTypes } from '../../store'

let initialState = {
    email: '' as string | null,
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
    setEmail: (email: string | null) => ({type: 'SN/settings/ACTIVATE', email} as const),
}