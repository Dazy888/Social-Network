import React from "react"

interface Props {
    isError: boolean
    errorMessage: string | undefined
    register: any
    name: string
    patternValue: RegExp
    minLength: number
    maxLength: number
    placeholder: string
    type: 'text' | 'password'
    className?: string
    errorName?: string
    passInpType?: 'text' | 'password'
    setPassInpType?: (type: 'text' | 'password') => void
}

const SettingsInputComponent: React.FC<Props> = ({ className, setPassInpType, passInpType, isError, errorMessage, register, name, type, errorName, patternValue, maxLength, minLength, placeholder }) => {
    console.log(isError)

    return(
        <div className={`error-container`}>
            {(isError) && <span>{errorMessage}</span>}
            <input required minLength={minLength} maxLength={maxLength} className={`${(isError) ? 'red-border' : ''} ${className}`} type={type} placeholder={placeholder}
                   {...(register(name,
                       {
                           pattern: { value: patternValue, message: `Invalid ${errorName || name}` }
                       }
                   ))}
            />
        </div>
    )
}

export const SettingsInput = React.memo(SettingsInputComponent)
