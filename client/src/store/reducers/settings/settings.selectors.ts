import { AppStateType } from "@/store/store"

export const getEmail: (state: AppStateType) => string | null = (state) => state.settings.email
