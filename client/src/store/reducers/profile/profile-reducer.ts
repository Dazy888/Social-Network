// Axios
import {AxiosResponse} from "axios"
// Types
import {InferActionsTypes} from '../../store'
import {PostType} from "../../../pages/login/types/login-types"
// Service
import {AuthService} from "../../../services/AuthService"
import {UserService} from "../../../services/UserSirvice"
import {settingsActions} from "../settings/settings-reducer";

let initialState = {
    id: 0,
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    subscriptions: 0,
    posts: [] as Array<PostType>,
    email: ''
}

type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: Actions): InitialStateType => {
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
        case 'SN/profile/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case 'SN/profile/DELETE_POST':
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state;
    }
}

type Actions = InferActionsTypes<typeof actions>

export const actions = {
    setUser: (name: string, location: string, banner: string, avatar: string, aboutMe: string, skills: string, hobbies: string, id: number, posts: Array<PostType>, email: string) => ({type: 'SN/profile/SET_USER', payload: {name, location, banner, avatar, aboutMe, skills, hobbies, id, posts, email}} as const),
    setName: (name: string) => ({type: 'SN/profile/SET_NAME', name} as const),
    setLocation: (location: string) => ({type: 'SN/profile/SET_LOCATION', location} as const),
    setBanner: (banner: string) => ({type: 'SN/profile/SET_BANNER', banner} as const),
    setAvatar: (avatar: string) => ({type: 'SN/profile/SET_AVATAR', avatar} as const),
    setAboutMe: (text: string) => ({type: 'SN/profile/SET_ABOUT_ME', text} as const),
    steHobbies: (text: string) => ({type: 'SN/profile/SET_HOBBIES', text} as const),
    setSkills: (text: string) => ({type: 'SN/profile/SET_SKILLS', text} as const),
    addNewPost: (post: PostType) => ({type: 'SN/profile/ADD_POST', post} as const),
    deletePost: (posts: Array<PostType>) => ({type: 'SN/profile/DELETE_POST', posts} as const),
}

export const auth = () => async (dispatch: any) => {
    const response: AxiosResponse = await AuthService.refresh()
    const user = response.data.user

    dispatch(actions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id, user.posts, user.email))
    dispatch(settingsActions.setEmail(user.email))
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

export const addPost = (text: string, id: number) => async (dispatch: any) => {
    const response: PostType = await UserService.addPost(text, id)
    dispatch(actions.addNewPost(response))
}

export const deletePost = (id: number, userId: number) => async (dispatch: any) => {
    const response: Array<PostType> = await UserService.deletePost(id, userId)
    dispatch(actions.deletePost(response))
}