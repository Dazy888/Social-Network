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
        case 'SN/profile/SET_HEADER_DATA':
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
    setUserData: (name: string, location: string, banner: string, avatar: string, aboutMe: string, skills: string, hobbies: string) => ({type: 'SN/profile/SET_USER_DATA', payload: {name, location, banner, avatar, aboutMe, skills, hobbies}} as const),
    setHeaderData: (name: string, location: string) => ({type: 'SN/profile/SET_HEADER_DATA', payload: {name, location}} as const)
}

export const auth = () => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.refresh()
    const user = response.data.user

    dispatch(actions.setUserData(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies))
    return response.status
}

export const changeHeaderData = (name: string, location: string, currentName: string) => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.changeHeaderData(name, location, currentName)
    if (typeof response === 'string') return response
    const user = response.data
    dispatch(actions.setHeaderData(user.newName, user.newLocation))
}

export const changeBanner = (file: File) => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.changeBanner(file)
}