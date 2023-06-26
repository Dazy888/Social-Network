import React from "react"
import { useRouter } from "next/router"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { UserInfo } from "@/components/pages/profile/header-section/UserInfo"

const HeaderSectionComponent = () => {
    const router = useRouter()

    const banner = useAppSelector(state => state.profileReducer.banner)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const location = useAppSelector(state => state.profileReducer.location)

    return(
        <section id={styles.header} className={'w-full h-fit relative'}>
            <img alt={'Banner'} className={`${styles.banner} w-full object-cover`} src={banner}/>
            <UserInfo {...{ name, avatar, location }} />
            <div className={styles.tile}></div>
            <button onClick={() => router.push('settings/profile')} className={`${styles.settings} absolute text-3xl`}>
                <i className={'fa-solid fa-gear'} />
            </button>
        </section>
    )
}

export const HeaderSection = React.memo(HeaderSectionComponent)
