import React, {useState} from "react"
import { UseFormRegister } from "react-hook-form"
import { IAuthForm } from "@/models/auth.models"
import styles from '@/styles/Authorization.module.scss'

interface Props {
    register: UseFormRegister<IAuthForm>
    name: 'login' | 'pass'
    patternValue: RegExp
    minLength: number
    placeholder: string
    type: 'text' | 'password'
    errorMessage?: string
    isError?: boolean
    maxLength?: number
    classNames?: string
}

const AuthInputComponent: React.FC<Props> = ({ isError, errorMessage, register, classNames, patternValue, maxLength, minLength, name, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [passType, setPassType] = useState<'password' | 'text'>('password')

    function toggleShowPassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword)
        setTimeout(() => setPassType((prevPassType) => (prevPassType === 'password') ? 'text' : 'password'), 150)
    }

    return(
        <div className={`error-container ${classNames}`}>
            {(isError) && <span>{errorMessage}</span>}
            <input required minLength={minLength} maxLength={maxLength} className={`${(isError) ? 'red-border' : ''} ${showPassword ? styles['show-password'] : styles['hide-password']}`}
                   type={(name === 'pass') ? passType : type} placeholder={placeholder}
                   {...(register(name,
                       {
                           pattern: { value: patternValue, message: 'Invalid value' }
                       }
                   ))}
            />
            {(type === 'password') &&
                <label className={'cursor-pointer'} onClick={toggleShowPassword}>
                    {showPassword ? <i className={'fas fa-eye-slash'} /> : <i className={'fas fa-eye'} />}
                </label>
            }
        </div>
    )
}

export const AuthInput = React.memo(AuthInputComponent)
