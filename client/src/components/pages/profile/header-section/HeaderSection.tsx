import React, { ReactNode, useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { UserInfo } from "@/components/pages/profile/header-section/UserInfo"
import { PulseLoader } from "react-spinners"
import { Banner } from "@/components/pages/profile/header-section/Banner"
import { Tile } from "@/components/pages/profile/header-section/Tile"
import { Settings } from "@/components/pages/profile/header-section/settings/Settings"
import { Subscriptions } from "@/components/pages/profile/header-section/subscriptions/Subscriptions"

interface Props {
    banner: string
    avatar: string
    name: string
    location: string
    forView: boolean
    subscriptionBtn?: ReactNode
}

const HeaderSectionComponent: React.FC<Props> = ({ name, avatar, location, forView, banner, subscriptionBtn}) => {
    const [isBannerLoading, setBannerLoading] = useState(false)

    return(
        <section id={styles.header} className={'w-full h-fit relative'}>
            <Banner isLoading={isBannerLoading} src={banner} />
            <UserInfo {...{ name, avatar, location }} />
            <Tile />
            {!forView && <Settings setBannerLoading={setBannerLoading} /> }
            {forView && <Subscriptions subscriptionBtn={subscriptionBtn} /> }
            {isBannerLoading && <PulseLoader className={`absolute ${styles['banner-loader']}`} color={'#f92552'} />}
        </section>
    )
}

export const HeaderSection = React.memo(HeaderSectionComponent)
