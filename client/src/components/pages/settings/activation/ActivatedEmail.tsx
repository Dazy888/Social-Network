import React from "react"
import styles from "@/styles/Settings.module.scss"

interface Props {
    email: string
}

const ActivatedEmailComponent: React.FC<Props> = ({ email }) => (
    <div className={styles['activated-email']}>
        <input className={styles['big-input']} disabled={true} value={email}/>
        <i className={'absolute fa-solid fa-circle-check'} />
    </div>
)

export const ActivatedEmail = React.memo(ActivatedEmailComponent)
