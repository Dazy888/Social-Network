export type ProfileIntroFields = 'aboutMe' | 'skills' | 'hobbies'
export type ImageFields = 'avatar' | 'banner'

export class CreatePostDto {
    id: string
    text: string
}

export class SetProfileInfoDto {
    id: string
    name: string
    location: string
}

export class SetProfileIntroDto {
    id: string
    field: ProfileIntroFields
    text: string
}

export class SetProfileImageDto {
    id: string
    field: ImageFields
}

export class SetSubscriptionDto {
    authorizedUserId: string
    openedUserId: string
}
