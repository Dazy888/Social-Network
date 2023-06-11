import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { profileReducer } from "@/store/reducers/ProfileSlice"
import { settingsReducer } from "@/store/reducers/SettingsSlice"
import { usersReducer } from "@/store/reducers/UsersSlice"

const rootReducer = combineReducers({ profileReducer, settingsReducer, usersReducer })
export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
