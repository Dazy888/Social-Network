import {InferActionsTypes} from '../../store'
import {SettingsService} from "../../../services/SettingsService";

let initialState = {
    email: '',
}

type InitialStateType = typeof initialState

export const settingsReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'SN/settings/ACTIVATE':
            return {
                ...state,
                email: action.email
            }
        default:
            return state;
    }
}

type Actions = InferActionsTypes<typeof settingsActions>

export const settingsActions = {
    setEmail: (email: string) => ({type: 'SN/settings/ACTIVATE', email} as const),
}