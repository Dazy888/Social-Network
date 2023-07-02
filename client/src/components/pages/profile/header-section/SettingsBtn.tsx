import React from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    setIsModal: (state: boolean) => void
}

const SettingsBtnComponent: React.FC<Props> = ({ setIsModal }) => {
    return(
        <button onClick={() => setIsModal(true)} className={`${styles.settings} absolute text-3xl`}>
            <i className={'fa-solid fa-gear'} />
        </button>
    )
}

export const SettingsBtn = React.memo(SettingsBtnComponent)
