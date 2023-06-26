import React from "react"
import { useRouter } from "next/router"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { UserInfo } from "@/components/pages/profile/user-header/UserInfo"

const UserHeaderComponent = () => {
    const router = useRouter()

    const banner = useAppSelector(state => state.profileReducer.banner)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const location = useAppSelector(state => state.profileReducer.location)

    return(
        <div className={`${styles['user-header']} w-full h-fit relative`}>
            <img alt={'Banner'} className={`${styles['user-header__banner']} w-full`} src={banner}/>
            <UserInfo {...{ name, avatar, location }} name={name} location={location} avatar={avatar} />
            <div className={styles['user-header__tile']}></div>
            <button onClick={() => router.push('settings/profile')} className={`${styles['user-header__settings']} absolute text-3xl`}>
                <i className={'fa-solid fa-gear'} />
            </button>
        </div>
    )
}

export const UserHeader = React.memo(UserHeaderComponent)
