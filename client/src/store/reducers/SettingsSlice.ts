import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
    email: string | null
    isActivated: boolean
}

let initialState: SettingsState = {
    email: '',
    isActivated: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingData(state, action: PayloadAction<SettingsState>) {
            state.email = action.payload.email
            state.isActivated = action.payload.isActivated
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    }
})

export const { setEmail, setSettingData } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
