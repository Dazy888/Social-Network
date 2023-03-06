import React from "react"
import { useRouter } from "next/router"
import styles from '@/styles/Users.module.scss'

interface PropsI {
    avatar: string
    name: string
    location: string
    id: string
}

const UserPreviewComponent: React.FC<PropsI> = ({id, name, avatar, location}) => {
    const router = useRouter()

    return(
        <div onClick={() => router.push(`/main/profile/${id}`)} id={id} className={`${styles['user']} flex justify-center items-center rounded-md mb-12 text-center cursor-pointer text-white p-1.5`}>
            <div>
                <img className={'w-24 h-24 rounded-full'} alt={'Avatar'} src={avatar}/>
                <h1 className={'text-2xl font-semibold my-3.5'}>{name}</h1>
                <p>{location}</p>
            </div>
        </div>
    )
}

export const UserPreview = React.memo(UserPreviewComponent)