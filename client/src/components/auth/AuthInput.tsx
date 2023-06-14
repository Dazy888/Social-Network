import React, {useState} from "react"
import { UseFormRegister } from "react-hook-form"
import { IAuthForm } from "@/models/auth"
import styles from '@/styles/Authorization.module.scss'

interface Props {
    isError: boolean
    errorMessage: string | undefined
    register: UseFormRegister<IAuthForm>
    name: 'login' | 'pass'
    patternValue: RegExp
    minLength: number
    maxLength: number
    placeholder: string
    type: 'text' | 'password'
}

const AuthInputComponent: React.FC<Props> = ({ isError, errorMessage, register, patternValue, maxLength, minLength, name, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [passType, setPassType] = useState<'password' | 'text'>('password')

    function toggleShowPassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword)
        setTimeout(() => setPassType((prevPassType) => (prevPassType === 'password') ? 'text' : 'password'), 150)
    }

    return(
        <div className={'error-container'}>
            {(isError) && <span>{errorMessage}</span>}
            <input minLength={minLength} maxLength={maxLength} className={`${(isError) ? 'red-border' : ''} ${showPassword ? styles['show-password'] : styles['hide-password']}`}
                   type={(name === 'pass') ? passType : type} placeholder={placeholder}
                   {...(register(name,
                       {
                           required: { value: true, message: 'Field is required' },
                           pattern: { value: patternValue, message: 'Invalid value' }
                       }
                   ))}
            />
            {(type === 'password') &&
                <label onClick={toggleShowPassword}>
                    {showPassword ? <i className={'fas fa-eye-slash'} /> : <i className={'fas fa-eye'} />}
                </label>
            }
        </div>
    )
}

export const AuthInput = React.memo(AuthInputComponent)
