import React from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    isLoading: boolean
    src: string
}

const BannerComponent: React.FC<Props> = ({ src, isLoading }) => (
    <div className={`${styles.banner} relative w-full`}>
        <img alt={'Banner'} className={`${styles.banner} w-full object-cover relative`} src={src || 'https://storage.googleapis.com/social-network_dazy/default-banner.webp'}/>
        {isLoading && <div className={'w-full absolute top-0'}></div>}
    </div>
)

export const Banner = React.memo(BannerComponent)
