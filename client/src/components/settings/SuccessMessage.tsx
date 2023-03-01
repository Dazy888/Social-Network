import React from "react"
import styles from '@/styles/Settings.module.scss'

interface PropsI {
    message: string
}

const SuccessMessage: React.FC<PropsI> = ({ message }) => {
    return(
        <div>
            <span className={styles['message']}>
                {message}
                <br/>
                <i className="fa-solid fa-circle-check"/>
            </span>
        </div>
    )
}

export const Message = React.memo(SuccessMessage)