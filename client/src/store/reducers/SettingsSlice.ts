import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
    email: string | null
    activatedEmail: boolean
}

let initialState: SettingsState = {
    email: '',
    activatedEmail: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingData(state, action: PayloadAction<SettingsState>) {
            state.email = action.payload.email
            state.activatedEmail = action.payload.activatedEmail
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    }
})

export const { setEmail, setSettingData } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
