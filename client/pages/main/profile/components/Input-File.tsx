import React, { useRef } from "react"
import { SetFieldValue } from "react-hook-form"
// @ts-ignore
import styles from '../../../../styles/Settings.module.scss'
interface Props {
    label: string
    name: string
    register: any
    setValue: SetFieldValue<any>
    currentValue: string
}
export const InputFileComponent: React.FC<Props> = ({ name, label, register, setValue, currentValue }) => {
    const circleRef: any = useRef()

    return(
        <div className={styles['box']}>
            <label className={name}>{label}</label>
            <input onClick={() => circleRef.current.classList.remove('success-image')} {...(register(name))} type="file" onChange={(event: any) => {setValue(name, event.currentTarget.files[0])}} />
            <div ref={circleRef} data-name={name} className={`${styles['circle']} flex-center`}>
                <i className="fa-solid fa-upload"></i>
            </div>
            <span>{currentValue}</span>
        </div>
    )
}
export const InputFile = React.memo(InputFileComponent)