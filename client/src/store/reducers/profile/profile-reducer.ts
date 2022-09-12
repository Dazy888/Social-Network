// Axios
import {AxiosResponse} from "axios"
// Types
import {InferActionsTypes} from '../../store'
// Service
import {AuthService} from "../../../services/AuthService"

let initialState = {
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    // photographs: [''] as Array<string>,
    // posts: [''] as Array<string>
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/profile/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setUserData: (name: string, location: string, banner: string, avatar: string) => ({type: 'SN/profile/SET_USER_DATA', payload: {name, location, banner, avatar}} as const)
}

export const auth = () => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.refresh()
    const user = response.data.user

    dispatch(actions.setUserData(user.name, user.location, user.banner, user.avatar))
    return response.status
}