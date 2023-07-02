export type Field = 'aboutMe' | 'skills' | 'hobbies'

export interface ProfileIntroProps {
    text: string
    field: Field
    id: string
}

export interface SubscriptionProps {
    authorizedUserId: string
    openedUserId: string
}

export class ChangeTextProps {
    text: string
    id: string
}

export interface SetProfileInfoProps {
    name: string
    location: string
    id: string
}
