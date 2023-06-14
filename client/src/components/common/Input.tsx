import React from "react"

interface Props {
    error: boolean
    register: any
    name: string
    patternValue: RegExp
    minLength: number
    maxLength: number
    placeholder: string
    type: 'text' | 'password'
    className?: string
    required?: boolean
    errorName?: string
}

const InputComponent: React.FC<Props> = ({ className, error, register, patternValue, maxLength, minLength, name, placeholder, type, required = true, errorName }) => {
    const changeServerError = () => {
        const input: any = document.querySelector(`input[name=${name}]`)
        input.classList.remove('success')
    }

    return(
        <div className={`error-container`}>
            {(error) && <span>{error}</span>}
            <input minLength={minLength} maxLength={maxLength} onClick={changeServerError} className={`${(error) ? 'red-border' : ''} ${className}`} type={type} placeholder={placeholder}
                   {...(register(name,
                        {
                            required: { value: required, message: 'Field is required' },
                            pattern: { value: patternValue, message: `Invalid ${errorName || name}` }
                        }
                   ))}
            />
            {(error) && <i className={'fa-solid fa-circle-exclamation'} />}
        </div>
    )
}

export const Input = React.memo(InputComponent)
