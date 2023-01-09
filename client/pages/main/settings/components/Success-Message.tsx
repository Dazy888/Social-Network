// @ts-ignore
import styles from '../../../../styles/Settings.module.scss'
import React from "react";
interface Props {
    message: string
}
const SuccessMessage: React.FC<Props> = ({ message }) => {
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