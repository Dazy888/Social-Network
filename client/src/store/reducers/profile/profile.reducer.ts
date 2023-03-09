import { InferActionsTypes } from '@/store/store'
import { IPost } from "@/interfaces/profile.interfaces"

let initialState = {
    userId: '',
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    posts: [] as IPost[],
    following: [] as string[],
    followers: [] as string[]
}

type InitialStateType = typeof initialState
type Actions = InferActionsTypes<typeof profileActions>

export const profileReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case 'SOCIAL-NETWORK/PROFILE/SET_USER':
            return {
                ...state,
                ...action.payload
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_BANNER':
            return {
                ...state,
                banner: action.banner
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_AVATAR':
            return {
                ...state,
                avatar: action.avatar
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_ABOUT_ME':
            return {
                ...state,
                aboutMe: action.text
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_HOBBIES':
            return {
                ...state,
                hobbies: action.text
            }
        case 'SOCIAL-NETWORK/PROFILE/SET_SKILLS':
            return {
                ...state,
                skills: action.text
            }
        case 'SOCIAL-NETWORK/PROFILE/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case 'SOCIAL-NETWORK/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
}

export const profileActions = {
    setUser: (name: string, location: string, banner: string, avatar: string, aboutMe: string, skills: string, hobbies: string, userId: string, posts: IPost[], followers: string[], following: string[]) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_USER', payload: { name, location, banner, avatar, aboutMe, skills, hobbies, userId, posts, followers, following } } as const),
    setName: (name: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_NAME', name } as const),
    setLocation: (location: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_LOCATION', location } as const),
    setBanner: (banner: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_BANNER', banner } as const),
    setAvatar: (avatar: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_AVATAR', avatar } as const),
    setAboutMe: (text: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_ABOUT_ME', text } as const),
    setHobbies: (text: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_HOBBIES', text } as const),
    setSkills: (text: string) => ({ type: 'SOCIAL-NETWORK/PROFILE/SET_SKILLS', text } as const),
    addNewPost: (post: IPost) => ({ type: 'SOCIAL-NETWORK/PROFILE/ADD_POST', post } as const),
    deletePost: (posts: IPost[]) => ({ type: 'SOCIAL-NETWORK/PROFILE/DELETE_POST', posts } as const),
}
