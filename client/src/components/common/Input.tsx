import React from "react"

interface Props {
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
    required?: boolean
    errorName?: string
}

const InputComponent: React.FC<Props> = ({ className, error, touched, register, patternValue, maxLength, minLength, name, placeholder, type, required = true, errorName }) => {
    const changeServerError = () => {
        const input: any = document.querySelector(`input[name=${name}]`)
        input.classList.remove('success')
    }

    return(
        <div className={`error-container`}>
            {(error && touched) && <span>{error}</span>}
            <input minLength={minLength} maxLength={maxLength} onClick={changeServerError} className={`${(error && touched) ? `red-border ${className}` : `${className}`}`} type={type} placeholder={placeholder}
                   {...(register(name,
                        {
                            required: { value: required, message: 'Field is required' },
                            pattern: { value: patternValue, message: `Invalid ${errorName || name}` }
                        }
                   ))}
            />
            {(error && touched) && <i className={'fa-solid fa-circle-exclamation'} />}
        </div>
    )
}

export const Input = React.memo(InputComponent)
