import React from "react"
import styles from "@/styles/Profile.module.scss"
import { User } from "@/models/auth.models"

const UserInfoComponent: React.FC<Pick<User, 'avatar' | 'name' | 'location'>> = ({ avatar, name, location}) => (
    <div className={`${styles.user} absolute z-10 text-center text-white`}>
        <img alt={'Avatar'} className={'rounded-full'} src={avatar}/>
        <h2 className={'text-2xl font-medium mb-1.5'}>{name}</h2>
        <p className={'opacity-90'}>{location}</p>
    </div>
)

export const UserInfo = React.memo(UserInfoComponent)
