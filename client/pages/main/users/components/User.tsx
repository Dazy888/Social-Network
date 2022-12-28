import styles from '../../../../styles/Users.module.scss'
import {useRouter} from "next/router";
import {useRef} from "react";

type PropsType = {
    avatar: string
    name: string
    location: string
    id: string
}
export function User({id, name, avatar, location}: PropsType) {
    const router = useRouter()
    function showProfile() {
        router.push(`/main/profile/${id}`)
    }

    return(
        <div onClick={() => showProfile()} id={id} className={`${styles['user']} flex-center`}>
            <div>
                <img src={avatar}/>
                <h1>{name}</h1>
                <p>{location}</p>
            </div>
        </div>
    )
}