import styles from '../../../../styles/Settings.module.scss'

type PropsType = {
    message: string
}

export function SuccessMessage({ message }: PropsType) {
    return(
        <div>
            <span className={styles['message']}>{message} <br/> <i className="fa-solid fa-circle-check"></i></span>
        </div>
    )
}