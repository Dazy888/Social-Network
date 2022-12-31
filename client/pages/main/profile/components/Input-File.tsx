import { useRef } from "react"
import { SetFieldValue } from "react-hook-form"
import styles from '../../../../styles/Settings.module.scss'

type PropsType = {
    label: string
    name: string
    register: any
    setValue: SetFieldValue<any>
    currentValue: string
}

export function InputFile({ name, label, register, setValue, currentValue }: PropsType) {
    const circleRef: any = useRef()

    return(
        <div className={styles['box']}>
            <label className={name}>{label}</label>
            <input onClick={() => circleRef.current.classList.remove('success-image')} {...(register(name))} type="file" onChange={(event: any) => {setValue(name, event.currentTarget.files[0])}} />
            <div ref={circleRef} name={name} className={`${styles['circle']} flex-center`}>
                <i className="fa-solid fa-upload"></i>
            </div>
            <span>{currentValue}</span>
        </div>
    )
}