import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
    email: string
}

let initialState: SettingsState = {
    email: ''
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    }
})

export const { setEmail } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
