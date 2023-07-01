import React from "react"
import styles from "@/styles/Settings.module.scss"
import { UseFormRegister, UseFormSetFocus } from "react-hook-form"
import { IActivate } from "@/models/settings.models"

interface Props {
    register: UseFormRegister<IActivate>
    setFocus: UseFormSetFocus<IActivate>
    focusedClassName: string
    setIsFocus: (state: boolean) => void
    value: string | null
    isStatic: boolean
}

const EmailInputComponent: React.FC<Props> = ({ register, value, setFocus, setIsFocus, focusedClassName, isStatic }) => {
    function blurHandler() {
        if (value) return
        setIsFocus(false)
    }

    function spanClickHandler() {
        setIsFocus(true)
        setFocus('email')
    }

    return(
        <div onFocus={() => setIsFocus(true)} onBlur={blurHandler} className={'relative mb-3'}>
            {isStatic
                ? <input className={`${styles['big-input']} ${styles.input}`} disabled value={value || ''}/>
                : <input required minLength={5} maxLength={35} className={`${styles['big-input']} ${styles.input}`} type={'email'} {...(register('email'))} />
            }
            {isStatic && <i className={`fa-solid fa-circle-check absolute text-xl ${styles['activated-icon']}`} />}
            {!isStatic && <span onClick={spanClickHandler} className={`absolute left-4 top-3 duration-300 ${styles.placeholder} ${focusedClassName}`}>Your e-mail</span>}
        </div>
    )
}

export const EmailInput = React.memo(EmailInputComponent)
