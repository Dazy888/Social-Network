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
    type: 'text' | 'password' | 'email'
    className?: string
}

const SettingsInputComponent: React.FC<Props> = ({ className, isError, errorMessage, register, name, type, patternValue, maxLength, minLength, placeholder }) => (
    <div className={`error-container`}>
        {(isError) && <span>{errorMessage}</span>}
        <input required minLength={minLength} maxLength={maxLength} className={`${(isError) ? 'red-border' : ''} ${className}`} type={type} placeholder={placeholder}
               {...(register(name, { pattern: { value: patternValue, message: 'Invalid value' } }))}
        />
    </div>
)

export const SettingsInput = React.memo(SettingsInputComponent)
