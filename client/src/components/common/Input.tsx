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
    required?: boolean
    errorName?: string
    passInpType?: 'text' | 'password'
    setPassInpType?: (type: 'text' | 'password') => void
}

const InputComponent: React.FC<Props> = ({ className, setPassInpType, passInpType, isError, errorMessage, register, patternValue, maxLength, minLength, name, placeholder, type, required = true, errorName }) => {
    const changeServerError = () => {
        const input: any = document.querySelector(`input[name=${name}]`)
        input.classList.remove('success')
    }

    return(
        <div className={`error-container`}>
            {/*{(isError) && <span>{errorMessage}</span>}*/}
            {/*<input minLength={minLength} maxLength={maxLength} onClick={changeServerError} className={`${(isError) ? 'red-border' : ''} ${className}`} type={type} placeholder={placeholder}*/}
            {/*       {...(register(name,*/}
            {/*            {*/}
            {/*                required: { value: required, message: 'Field is required' },*/}
            {/*                pattern: { value: patternValue, message: `Invalid ${errorName || name}` }*/}
            {/*            }*/}
            {/*       ))}*/}
            {/*/>*/}
            {/*{(type === 'password') && */}
            {/*    <button onClick={() => (passInpType === 'password') ? setPassInpType('text') : setPassInpType('password')}>*/}
            {/*        <i className={'fa-solid fa-eye'} />*/}
            {/*    </button>*/}
            {/*}*/}
            {/*{(isError) && <i className={'fa-solid fa-circle-exclamation'} />}*/}
        </div>
    )
}

export const Input = React.memo(InputComponent)
