import React, { useRef } from "react"
// Form
import { SetFieldValue, UseFormRegister } from "react-hook-form"
// Styles
import styles from '@/styles/Settings.module.scss'

interface Props {
    label: 'Avatar' | 'Banner'
    name: 'avatar' | 'banner'
    register: UseFormRegister<any>
    setValue: SetFieldValue<any>
    currentValue: string
}

export const FileInputComponent: React.FC<Props> = ({ name, label, register, setValue, currentValue }) => {
    const circleRef: any = useRef()

    return(
        <div className={styles['box']}>
            <label className={name}>{label}</label>
            <input onClick={() => circleRef.current.classList.remove('success-image')} {...(register(name))} type={'file'} onChange={(event: any) => {setValue(name, event.currentTarget.files[0])}}/>
            <div ref={circleRef} data-name={name} className={`${styles['circle']} flex justify-center items-center`}>
                <i className={'fa-solid fa-upload'}/>
            </div>
            <span>{currentValue}</span>
        </div>
    )
}

export const FileInput = React.memo(FileInputComponent)
