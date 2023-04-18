import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    isActivated: boolean
}

let initialState: AuthState = {
    isActivated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<boolean>) {
            state.isActivated = action.payload
        }
    }
})

export const { setAuthData } = authSlice.actions
export const authReducer = authSlice.reducer
