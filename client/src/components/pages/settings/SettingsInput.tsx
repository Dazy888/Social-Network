import React from "react"
import { UseFormRegister } from "react-hook-form"

interface Props {
    isError: boolean
    errorMessage: string | undefined
    register: UseFormRegister<any>
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
        {isError && <span>{errorMessage}</span>}
        <input required {...{ minLength, maxLength, type, placeholder }} className={`${(isError) ? 'red-border' : ''} ${className}`}
               {...(register(name, { pattern: { value: patternValue, message: 'Invalid value' } }))}
        />
    </div>
)

export const SettingsInput = React.memo(SettingsInputComponent)
