import React from "react"
import { ErrorMessage } from "@/components/auth/ErrorMessages"
import { ErrorIcon } from "@/components/auth/ErrorIcons"

interface IProps {
    error: string | undefined
    touched: boolean | undefined
    register: any
    name: string
    patternValue: RegExp
    minLength: number
    maxLength: number
    placeholder: string
    type: 'text' | 'password'
    className?: string
    serverError?: string
    setServerError?: (error: string) => void
    required?: boolean
    errorName?: string
}

const InputComponent: React.FC<IProps> = ({ className, error, touched, serverError, register, patternValue, maxLength, minLength, name, setServerError, placeholder, type, required = true, errorName }) => {
    const changeServerError = () => {
        const input: any = document.querySelector(`input[name=${name}]`)
        input.classList.remove('success')
        if (setServerError) setServerError('')
    }

    return(
        <div className={`error-container`}>
            <ErrorMessage error={error} serverError={serverError} touched={touched}/>
            <input minLength={minLength} maxLength={maxLength} onClick={changeServerError} className={`${error && touched || serverError ? `red-border ${className}` : `${className}`}`} type={type} placeholder={placeholder}  {...(register(name,
                {
                    required: {
                        value: required,
                        message: 'Field is required'
                    },
                    pattern: {
                        value: patternValue,
                        message: `Invalid ${errorName || name}`
                    }
                }))}/>
            <ErrorIcon error={error} serverError={serverError} touched={touched}/>
        </div>
    )
}

export const Input = React.memo(InputComponent)
