import React, { useState } from "react"
import dynamic from "next/dynamic"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { UserInfo } from "@/components/pages/profile/header-section/UserInfo"
const Modal = dynamic(() => import('@/components/pages/profile/header-section/modal/Modal'), { ssr: false })

const HeaderSectionComponent = () => {
    const banner = useAppSelector(state => state.profileReducer.banner)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const location = useAppSelector(state => state.profileReducer.location)

    const [isModal, setIsModal] = useState(false)

    return(
        <section id={styles.header} className={'w-full h-fit relative'}>
            <img alt={'Banner'} className={`${styles.banner} w-full object-cover`} src={banner}/>
            <UserInfo {...{ name, avatar, location }} />
            <div className={styles.tile}></div>
            <button onClick={() => setIsModal(true)} className={`${styles.settings} absolute text-3xl`}>
                <i className={'fa-solid fa-gear'} />
            </button>
            {isModal && <Modal setIsModal={setIsModal} />}
        </section>
    )
}

export const HeaderSection = React.memo(HeaderSectionComponent)
