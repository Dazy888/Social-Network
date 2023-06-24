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
        <div onClick={() => router.push(`/profile/${id}`)} id={id} className={`${styles['user']} flex justify-center items-center rounded-md mb-12 text-center cursor-pointer text-white p-1.5 duration-300`}>
            <div>
                <img className={'w-24 h-24 rounded-full'} alt={'Avatar'} src={avatar} />
                <h3 className={'text-2xl font-semibold my-3.5'}>{name}</h3>
                <p>{location}</p>
            </div>
        </div>
    )
}

export const UserPreview = React.memo(UserPreviewComponent)
