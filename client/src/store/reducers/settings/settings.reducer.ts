import { InferActionsTypes } from "@/store/store"

let initialState = {
    email: '' as string | null
}

type InitialStateType = typeof initialState
type Actions = InferActionsTypes<typeof settingsActions>

export const settingsReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL-NETWORK/SETTINGS/ACTIVATE':
            return {
                ...state,
                email: action.email
            }
        default:
            return state
    }
}

export const settingsActions = {
    setEmail: (email: string | null) => ({ type: 'SOCIAL-NETWORK/SETTINGS/ACTIVATE', email } as const),
}
