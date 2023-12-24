export type ImageFields = 'avatar' | 'banner'

export class CreatePostDTO {
    userId: string
    text: string
}

export class SetProfileImageDTO {
    userId: string
    field: ImageFields
}

export interface UpdateUserDTO {
    name: string
    location: string
    banner: string | null
    avatar: string | null
    aboutUserText: string
    userHobbiesText: string
    userSkillsText: string
}
