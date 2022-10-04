import {AppStateType} from "../../store";

export const getEmail = (state: AppStateType) => {
    return state.settings.email
}