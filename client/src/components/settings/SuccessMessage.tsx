import React from "react"
import styles from '@/styles/Settings.module.scss'

interface PropsI {
    message: string
}

const SuccessMessage: React.FC<PropsI> = ({ message }) => {
    return(
        <div className={styles['message']}>
            {message}
            <br/>
            <i className={'fa-solid fa-circle-check'}/>
        </div>
    )
}

export const Message = React.memo(SuccessMessage)