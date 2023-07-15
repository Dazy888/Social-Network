import React from "react"
import { useRouter } from "next/router"
import styles from '@/styles/Users.module.scss'

interface Props {
    avatar: string
    name: string
    location: string
    id: string
}

const UserPreviewComponent: React.FC<Props> = ({id, name, avatar, location}) => {
    const router = useRouter()

    return(
        <div onClick={() => router.push(`/profile/${id}`)} id={id} className={`${styles['user']} flex-center rounded-md mb-12 text-center cursor-pointer text-white p-1.5 duration-300`}>
            <div>
                <img className={'w-24 h-24 rounded-full mx-auto'} alt={'Avatar'} src={avatar || 'https://storage.googleapis.com/social-network_dazy/profiles/avatars/default-avatar.webp'} />
                <h3 className={'text-2xl font-medium mt-3.5 mb-1'}>{name}</h3>
                <p>{location}</p>
            </div>
        </div>
    )
}

export const UserPreview = React.memo(UserPreviewComponent)
