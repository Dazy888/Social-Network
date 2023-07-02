import React, { useState } from "react"
import dynamic from "next/dynamic"
import { SettingsBtn } from "@/components/pages/profile/header-section/settings/SettingsBtn"
import { UploadBannerBtn } from "@/components/pages/profile/header-section/settings/UploadBannerBtn"
const Modal = dynamic(() => import('@/components/pages/profile/header-section/modal/Modal'), { ssr: false })

interface Props {
    setBannerLoading: (state: boolean) => void
}

const SettingsComponent: React.FC<Props> = ({ setBannerLoading }) => {
    const [isModal, setIsModal] = useState(false)

    return(
        <>
            <SettingsBtn setIsModal={setIsModal} />
            {isModal && <Modal setIsModal={setIsModal} />}
            <UploadBannerBtn setBannerLoading={setBannerLoading} />
        </>
    )
}

export const Settings = React.memo(SettingsComponent)
