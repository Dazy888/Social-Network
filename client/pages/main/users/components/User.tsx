import styles from '../../../../styles/Users.module.scss'
import { useRouter } from "next/router"

type PropsType = {
    avatar: string
    name: string
    location: string
    id: string
}
export function User({id, name, avatar, location}: PropsType) {
    const router = useRouter()
    async function showProfile() {
        await router.push(`/main/profile/${id}`)
    }

    return(
        <div onClick={() => showProfile()} id={id} className={`${styles['user']} flex-center`}>
            <div>
                <img alt={'Avatar'} src={avatar}/>
                <h1>{name}</h1>
                <p>{location}</p>
            </div>
        </div>
    )
}