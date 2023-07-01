import React, {useState} from "react"
import styles from '@/styles/Settings.module.scss'
import { UseFormRegister, UseFormSetFocus } from "react-hook-form"
import { IChangePass } from "@/models/settings.models"

interface Props {
    isError: boolean
    errorMessage: string | undefined
    register: UseFormRegister<IChangePass>
    name: 'currentPass' | 'newPass' | 'confirmPass'
    placeholder: string
    setFocus: UseFormSetFocus<IChangePass>
    value: string
}

const ChangePassInputComponent: React.FC<Props> = ({ isError, errorMessage, register, name, placeholder, value, setFocus }) => {
    const [isFocus, setIsFocus] = useState(false)

    function blurHandler() {
        if (value) return
        setIsFocus(false)
    }

    function spanClickHandler() {
        setIsFocus(true)
        setFocus(name)
    }

    return(
        <div className={'relative'} onFocus={() => setIsFocus(true)} onBlur={blurHandler}>
            <input required type={'password'} minLength={8} maxLength={15} className={`${isError ? 'red-border' : ''} ${styles['big-input']} ${styles.input}`}
                   {...(register(name, { pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/, message: 'Invalid value' } }))}
            />
            <span onClick={spanClickHandler} className={`absolute left-4 top-3 duration-300 ${styles.placeholder} ${isFocus ? styles.focused : ''}`}>{placeholder} password</span>
            {isError && <i className={`fa-solid fa-circle-exclamation err-icon absolute right-4 ${styles['err-icon'] || ''}`} />}
        </div>
    )
}

export const  ChangePassInput = React.memo(ChangePassInputComponent)
