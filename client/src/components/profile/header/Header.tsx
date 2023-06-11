import React from "react"
import { useRouter } from "next/router"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { UserInfo } from "@/components/profile/header/UserInfo"

const HeaderComponent = () => {
    const router = useRouter()

    const banner = useAppSelector(state => state.profileReducer.banner)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const location = useAppSelector(state => state.profileReducer.location)

    return(
        <div className={`${styles.header} w-full h-fit relative`}>
            <img alt={'Banner'} className={`${styles.banner} w-full`} src={banner}/>
            <UserInfo name={name} location={location} avatar={avatar} />
            <div className={styles.tile}></div>
            <button onClick={() => router.push('settings/profile')} className={`${styles['settings-btn']} absolute text-3xl`}>
                <i className={'fa-solid fa-gear'}/>
            </button>
        </div>
    )
}

export const Header = React.memo(HeaderComponent)
