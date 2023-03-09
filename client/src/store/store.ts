import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
// Reducers
import { authReducer } from "@/store/reducers/auth/auth.reducer"
import { profileReducer } from "@/store/reducers/profile/profile.reducer"
import { settingsReducer } from "@/store/reducers/settings/settings.reducer"

let rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    settings: settingsReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
