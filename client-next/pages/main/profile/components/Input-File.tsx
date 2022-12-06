import { SetFieldValue } from "react-hook-form"
import styles from '../../../../styles/Profile.module.scss'

type PropsType = {
    label: string
    name: string
    register: any
    setValue: SetFieldValue<any>
    currentValue: string
}

export function InputFile({ name, label, register, setValue, currentValue }: PropsType) {
    return(
        <div className={styles['box']}>
            <label>{label}</label>
            <input {...(register(name))} type="file" onChange={(event: any) => {setValue(name, event.currentTarget.files[0])}} />
            <div className={`${styles['circle']} flex-center`}>
                <i className="fa-solid fa-upload"></i>
            </div>
            <span className={styles['photo-name']}>{currentValue}</span>
        </div>
    )
}