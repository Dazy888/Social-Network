import React, { ReactNode, useState } from "react"
import dynamic from "next/dynamic"
import styles from "@/styles/Profile.module.scss"
import { UserInfo } from "@/components/pages/profile/header-section/UserInfo"
import { UploadBannerBtn } from "@/components/pages/profile/header-section/UploadBannerBtn";
import { SettingsBtn } from "@/components/pages/profile/header-section/SettingsBtn"
import { PulseLoader } from "react-spinners"
const Modal = dynamic(() => import('@/components/pages/profile/header-section/modal/Modal'), { ssr: false })

interface Props {
    banner: string
    avatar: string
    name: string
    location: string
    forView: boolean
    subscriptionBtn?: ReactNode
}

const HeaderSectionComponent: React.FC<Props> = ({ name, avatar, location, forView, banner, subscriptionBtn}) => {
    const [isModal, setIsModal] = useState(false)
    const [isBannerLoading, setBannerLoading] = useState(false)

    return(
        <section id={styles.header} className={'w-full h-fit relative'}>
            <div className={`${styles.banner} relative w-full`}>
                <img alt={'Banner'} className={`${styles.banner} w-full object-cover relative`} src={banner}/>
                {isBannerLoading && <div className={'w-full absolute top-0'}></div>}
            </div>
            <UserInfo {...{ name, avatar, location }} />
            <div className={styles.tile}></div>
            {!forView &&
                <>
                    <SettingsBtn setIsModal={setIsModal} />
                    {isModal && <Modal setIsModal={setIsModal} />}
                    <UploadBannerBtn setBannerLoading={setBannerLoading} />
                </>
            }
            {forView &&
                <div className={`${styles.subscription} absolute`}>
                    {subscriptionBtn}
                </div>
            }
            {isBannerLoading && <PulseLoader className={`absolute ${styles['banner-loader']}`} color={'#f92552'} />}
        </section>
    )
}

export const HeaderSection = React.memo(HeaderSectionComponent)
