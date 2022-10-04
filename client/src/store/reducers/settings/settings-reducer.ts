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

export const activate = (email: string, id: number) => async (dispatch: any) => {
    const response = await SettingsService.activate(email, id)
    dispatch(settingsActions.setEmail(response.data.email))
}

export const cancelActivation = (id: number) => async (dispatch: any) => {
    await SettingsService.cancelActivation(id)
    dispatch(settingsActions.setEmail(''))
}