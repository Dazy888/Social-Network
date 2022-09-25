// Axios
import {AxiosResponse} from "axios"
// Types
import {InferActionsTypes} from '../../store'
// Service
import {AuthService} from "../../../services/AuthService"
import {UserService} from "../../../services/UserSirvice";

let initialState = {
    id: 0,
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    // photographs: [''] as Array<string>,
    posts: []
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/profile/SET_USER':
            return {
                ...state,
                ...action.payload
            }
        case 'SN/profile/SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SN/profile/SET_LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'SN/profile/SET_BANNER':
            return {
                ...state,
                banner: action.banner
            }
        case 'SN/profile/SET_AVATAR':
            return {
                ...state,
                avatar: action.avatar
            }
        case 'SN/profile/SET_ABOUT_ME':
            return {
                ...state,
                aboutMe: action.text
            }
        case 'SN/profile/SET_HOBBIES':
            return {
                ...state,
                hobbies: action.text
            }
        case 'SN/profile/SET_SKILLS':
            return {
                ...state,
                skills: action.text
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setUser: (name: string, location: string, banner: string, avatar: string, aboutMe: string, skills: string, hobbies: string, id: number) => ({type: 'SN/profile/SET_USER', payload: {name, location, banner, avatar, aboutMe, skills, hobbies, id}} as const),
    setName: (name: string) => ({type: 'SN/profile/SET_NAME', name} as const),
    setLocation: (location: string) => ({type: 'SN/profile/SET_LOCATION', location} as const),
    setBanner: (banner: string) => ({type: 'SN/profile/SET_BANNER', banner} as const),
    setAvatar: (avatar: string) => ({type: 'SN/profile/SET_AVATAR', avatar} as const),
    setAboutMe: (text: string) => ({type: 'SN/profile/SET_ABOUT_ME', text} as const),
    steHobbies: (text: string) => ({type: 'SN/profile/SET_HOBBIES', text} as const),
    setSkills: (text: string) => ({type: 'SN/profile/SET_SKILLS', text} as const),
}

export const auth = () => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.refresh()
    const user = response.data.user

    dispatch(actions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id))
    return response.status
}

export const changeName = (name: string, id: number) => async (dispatch: any) => {
    const response: AxiosResponse = await UserService.changeName(name, id)
    if (typeof response === 'string') return response
    dispatch(actions.setName(response.data))
}

export const changeLocation = (location: string, id: number) => async (dispatch: any) => {
    const response: string = await UserService.changeLocation(location, id)
    dispatch(actions.setLocation(response))
}

export const changeBanner = (data: FormData) => async (dispatch: any) => {
    const response: string = await UserService.changeBanner(data)
    dispatch(actions.setBanner(response))
}

export const changeAvatar = (data: FormData) => async (dispatch: any) => {
    const response: string = await UserService.changeAvatar(data)
    dispatch(actions.setAvatar(response))
}

export const changeAboutMe = (text: string, id: number) => async (dispatch: any) => {
    const response: string = await UserService.changeAboutMe(text, id)
    dispatch(actions.setAboutMe(response))
}

export const changeHobbies = (text: string, id: number) => async (dispatch: any) => {
    const response: string = await UserService.changeHobbies(text, id)
    dispatch(actions.steHobbies(response))
}

export const changeSkills = (text: string, id: number) => async (dispatch: any) => {
    const response: string = await UserService.changeSkills(text, id)
    dispatch(actions.setSkills(response))
}