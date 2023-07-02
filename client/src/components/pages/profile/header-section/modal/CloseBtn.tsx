import React from "react"
import styles from "@/styles/Profile.module.scss"
import { ModalProps } from "@/components/pages/profile/header-section/modal/Modal"

const CloseBtnComponent: React.FC<ModalProps> = ({ setIsModal }) => (
    <button onClick={() => setIsModal(false)} className={`${styles.cancel} absolute right-2 top-2`}>
        <i className={'fa-solid fa-circle-xmark text-xl'} />
    </button>
)

export const CloseBtn = React.memo(CloseBtnComponent)
