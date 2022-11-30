import { AppStateType } from "../../store"

export const getActivatedStatus = (state: AppStateType) => state.auth.isActivated