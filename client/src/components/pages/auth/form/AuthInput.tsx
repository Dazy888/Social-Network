import React, { useState } from "react"
import { UseFormRegister, UseFormSetFocus } from "react-hook-form"
import { IAuthForm } from "@/models/auth.models"
import styles from '@/styles/Auth.module.scss'

interface Props {
    register: UseFormRegister<IAuthForm>
    name: 'userName' | 'pass'
    patternValue: RegExp
    minLength: number
    placeholder: string
    type: 'text' | 'password'
    value: string
    setFocus: UseFormSetFocus<IAuthForm>
    errorMessage?: string
    isError?: boolean
    maxLength?: number
}

const AuthInputComponent: React.FC<Props> = ({ isError, errorMessage, register, patternValue, setFocus, maxLength, value, minLength, name, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [passType, setPassType] = useState<'password' | 'text'>('password')
    const [isFocused, setIsFocused] = useState(false)

    function toggleShowPassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword)
        setTimeout(() => setPassType((prevPassType) => (prevPassType === 'password') ? 'text' : 'password'), 150)
    }

    function blurHandler() {
        if (value) return
        setIsFocused(false)
    }

    function spanClickHandler() {
        setIsFocused(true)
        setFocus(name)
    }

    return(
        <div className={`${styles['input-container']} w-full rounded-full relative mx-auto`} onBlur={blurHandler}>
            {(isError) && <span className={`${styles.error} text-sm absolute`}>Invalid value</span>}
            <input required {...{ minLength, maxLength }} type={(name === 'pass') ? passType : type} onFocus={() => setIsFocused(true)}
                   className={`${(isError) ? 'red-border' : ''} ${showPassword ? styles['show-password'] : styles['hide-password']} w-full rounded-full py-4 pl-4`}
                   {...(register(name,
                       {
                           pattern: { value: patternValue, message: 'Invalid value' }
                       }
                   ))}
            />
            <span onClick={spanClickHandler} className={`absolute duration-300 ${styles.placeholder} ${isFocused ? styles.focused : ''}`}>{placeholder}</span>
            {(type === 'password') &&
                <label className={`cursor-pointer absolute right-5 ${styles.eye}`} onClick={() => value !== '' && toggleShowPassword()}>
                    {showPassword ? <i className={'fas fa-eye-slash'} /> : <i className={'fas fa-eye'} />}
                </label>
            }
        </div>
    )
}

export const AuthInput = React.memo(AuthInputComponent)
