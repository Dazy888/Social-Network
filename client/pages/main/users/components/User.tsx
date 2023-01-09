import React from "react"
import { useRouter } from "next/router"
// @ts-ignore
import styles from '../../../../styles/Users.module.scss'
interface Props {
    avatar: string
    name: string
    location: string
    id: string
}
const UserPreviewComponent: React.FC<Props> = ({id, name, avatar, location}) => {
    const router = useRouter()

    return(
        <div onClick={() => router.push(`/main/profile/${id}`)} id={id} className={`${styles['user']} flex-center`}>
            <div>
                <img alt={'Avatar'} src={avatar}/>
                <h1>{name}</h1>
                <p>{location}</p>
            </div>
        </div>
    )
}
export const UserPreview = React.memo(UserPreviewComponent)