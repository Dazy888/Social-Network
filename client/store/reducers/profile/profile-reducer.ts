import { InferActionsTypes } from '../../store'
import { PostType } from "../../../pages/main/profile/types/profile-types"

let initialState = {
    userId: '',
    banner: '',
    avatar: '',
    name: '',
    location: '',
    aboutMe: '',
    hobbies: '',
    skills: '',
    posts: [] as PostType[],
    email: '' as string | null,
    following: [] as string[],
    followers: [] as string[]
}

type InitialStateType = typeof initialState
type Actions = InferActionsTypes<typeof profileActions>
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
        case 'SN/profile/ADD_FOLLOWING':
            return {
                ...state,
                following: [...state.following, action.user]
            }
        case 'SN/profile/REMOVE_FOLLOWING':
            return {
                ...state,
                following: action.users
            }
        default:
            return state;
    }
}
export const profileActions = {
    setUser: (name: string, location: string, banner: string, avatar: string, aboutMe: string, skills: string, hobbies: string, userId: string, posts: PostType[], email: string | null, followers: string[], following: string[]) => ({type: 'SN/profile/SET_USER', payload: { name, location, banner, avatar, aboutMe, skills, hobbies, userId, posts, email, followers, following }} as const),
    setName: (name: string) => ({ type: 'SN/profile/SET_NAME', name } as const),
    setLocation: (location: string) => ({ type: 'SN/profile/SET_LOCATION', location } as const),
    setBanner: (banner: string) => ({ type: 'SN/profile/SET_BANNER', banner } as const),
    setAvatar: (avatar: string) => ({ type: 'SN/profile/SET_AVATAR', avatar } as const),
    setAboutMe: (text: string) => ({ type: 'SN/profile/SET_ABOUT_ME', text } as const),
    setHobbies: (text: string) => ({ type: 'SN/profile/SET_HOBBIES', text } as const),
    setSkills: (text: string) => ({ type: 'SN/profile/SET_SKILLS', text } as const),
    addNewPost: (post: PostType) => ({ type: 'SN/profile/ADD_POST', post } as const),
    deletePost: (posts: Array<PostType>) => ({ type: 'SN/profile/DELETE_POST', posts } as const),
    addFollowing: (user: string) => ({ type: 'SN/profile/ADD_FOLLOWING', user } as const),
    removeFollowing: (users: string[]) => ({ type: 'SN/profile/REMOVE_FOLLOWING', users } as const),
}