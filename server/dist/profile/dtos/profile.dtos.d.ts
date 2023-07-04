export declare type ProfileIntroFields = 'aboutMe' | 'skills' | 'hobbies';
export declare type ImageFields = 'avatar' | 'banner';
export declare class CreatePostDto {
    id: string;
    text: string;
}
export declare class SetProfileInfoDto {
    id: string;
    name: string;
    location: string;
}
export declare class SetProfileIntroDto {
    id: string;
    field: ProfileIntroFields;
    text: string;
}
export declare class SetProfileImageDto {
    id: string;
    field: ImageFields;
}
export declare class SetSubscriptionDto {
    authorizedUserId: string;
    openedUserId: string;
}
