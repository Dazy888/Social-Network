import { AppStateType } from "@/store/store"

export const getActivatedStatus: (state: AppStateType) => boolean = (state) => state.auth.isActivated
