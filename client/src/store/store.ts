import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "@/store/reducers/AuthSlice"
import { profileReducer } from "@/store/reducers/ProfileSlice"
import { settingsReducer } from "@/store/reducers/SettingsSlice"

const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    settingsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
