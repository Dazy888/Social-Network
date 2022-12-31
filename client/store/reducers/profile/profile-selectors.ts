import { AppStateType } from "../../store"
export const getBanner = (state: AppStateType) => state.profile.banner
export const getAvatar = (state: AppStateType) => state.profile.avatar
export const getName = (state: AppStateType) => state.profile.name
export const getLocation = (state: AppStateType) => state.profile.location
export const getAboutMe = (state: AppStateType) => state.profile.aboutMe
export const getSkills = (state: AppStateType) => state.profile.skills
export const getHobbies = (state: AppStateType) => state.profile.hobbies
export const getId = (state: AppStateType) => state.profile.userId
export const getPosts = (state: AppStateType) => state.profile.posts
export const getSubscriptions = (state: AppStateType) => state.profile.subscriptions