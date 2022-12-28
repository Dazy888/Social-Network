import { useRouter } from "next/router"
import styles from "../../../../styles/Profile.module.scss"

type PropsType = {
    avatar: string
    banner: string
    location: string
    name: string
    forView?: boolean
}
export function Header({ name, avatar, banner, location, forView = false }: PropsType) {
    const router = useRouter()

    return(
        <div className={styles['header']}>
            <img alt={'Banner'} className={styles['header__banner']} src={banner}/>
            <div className={styles['header__user']}>
                <img alt={'Avatar'} className={styles['header__avatar']} src={avatar}/>
                <p className={styles['header__name']}>{name}</p>
                <p className={styles['header__location']}>{location}</p>
            </div>
            <div className={styles['header__tile']}></div>
            {!forView ? <button onClick={() => router.push('settings/profile')} className={styles['header__settings']}>
                <i className="fa-solid fa-gear"></i>
            </button> : null}
        </div>
    )
}