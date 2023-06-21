export declare type Field = 'aboutMe' | 'skills' | 'hobbies';
export interface ProfileIntroProps {
    text: string;
    field: Field;
    id: string;
}
export interface SubscriptionProps {
    authorizedUserId: string;
    openedUserId: string;
}
export declare class ChangeTextProps {
    text: string;
    id: string;
}
