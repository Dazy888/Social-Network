import { AppStateType } from "@/store/store"
import { IPost } from "@/interfaces/profile.interfaces"

type StringAnswer = (state: AppStateType) => string
type StringArrAnswer = (state: AppStateType) => string[]

export const getBanner: StringAnswer = (state) => state.profile.banner
export const getAvatar: StringAnswer = (state) => state.profile.avatar
export const getName: StringAnswer = (state) => state.profile.name
export const getLocation: StringAnswer = (state) => state.profile.location
export const getAboutMe: StringAnswer = (state) => state.profile.aboutMe
export const getSkills: StringAnswer = (state) => state.profile.skills
export const getHobbies: StringAnswer = (state) => state.profile.hobbies
export const getUserId: StringAnswer = (state) => state.profile.userId
export const getPosts: (state: AppStateType) => IPost[] = (state) => state.profile.posts
export const getFollowing: StringArrAnswer = (state) => state.profile.following
export const getFollowers: StringArrAnswer = (state) => state.profile.followers
