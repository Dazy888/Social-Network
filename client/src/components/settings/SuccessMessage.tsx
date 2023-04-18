import React from "react"
import styles from '@/styles/Settings.module.scss'

interface IProps {
    message: string
}

const SuccessMessage: React.FC<IProps> = ({ message }) => {
    return(
        <div className={styles.message}>
            {message}
            <br/>
            <i className={'fa-solid fa-circle-check'}/>
        </div>
    )
}

export const Message = React.memo(SuccessMessage)
