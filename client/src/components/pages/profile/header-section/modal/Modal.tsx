import React from "react"
import styles from '@/styles/Profile.module.scss'
import { CloseBtn } from "@/components/pages/profile/header-section/modal/CloseBtn"
import { ModalForm } from "@/components/pages/profile/header-section/modal/ModalForm"

export interface ModalProps {
    setIsModal: (state: boolean) => void
}

const Modal: React.FC<ModalProps> = ({ setIsModal }) => (
    <div id={styles.modal} className={'h-screen w-screen fixed top-0 left-0 z-50 flex-center'}>
        <div className={`${styles.container} rounded-xl p-6 relative`}>
            <CloseBtn setIsModal={setIsModal} />
            <ModalForm />
        </div>
    </div>
)

export default React.memo(Modal)
