import React from "react"
import styles from '@/styles/Settings.module.scss'
import { UseFormRegister } from "react-hook-form"
import { IChangePass } from "@/models/settings.models"

interface Props {
    isError: boolean
    errorMessage: string | undefined
    register: UseFormRegister<IChangePass>
    name: 'currentPass' | 'newPass' | 'confirmPass'
    placeholder: string
}

const ChangePassInputComponent: React.FC<Props> = ({ isError, errorMessage, register, name, placeholder }) => (
    <div className={`error-container`}>
        {isError && <span>{errorMessage}</span>}
        <input required type={'password'} placeholder={`${placeholder} password`} minLength={8} maxLength={15} className={`${(isError) ? 'red-border' : ''} ${styles['big-input']} ${styles.input}`}
               {...(register(name, { pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/, message: 'Invalid value' } }))}
        />
    </div>
)

export const  ChangePassInput = React.memo(ChangePassInputComponent)
