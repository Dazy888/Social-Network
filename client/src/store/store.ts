import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {authReducer} from "./reducers/auth/auth-reducer"
import {profileReducer} from "./reducers/profile/profile-reducer"
import {settingsReducer} from "./reducers/settings/settings-reducer";

let rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    settings: settingsReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store