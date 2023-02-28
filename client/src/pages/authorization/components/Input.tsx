import React, { useRef } from "react"
import { Messages } from "./ErrorMessages"
import { Icons } from "./ErrorIcons"
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
    serverError?: string
    changeServerError?: any
    required?: boolean
    errorName?: string
}
const InputComponent: React.FC<Props> = ({ className, error, touched, serverError, register, patternValue, maxLength, minLength, name, changeServerError, placeholder, type, required = true, errorName }) => {
    const inpRef: any = useRef()
    function changingServerError() {
        const input: any = document.querySelector(`input[name=${name}]`)
        input.classList.remove('success')
        if (changeServerError) changeServerError('')
    }

    return(
        <div className={`error-container`}>
            <Messages error={error} serverError={serverError} touched={touched}/>
            <input ref={inpRef} minLength={minLength} maxLength={maxLength} onClick={changingServerError} className={`${error && touched || serverError ? `red-border ${className}` : `${className}`}`} type={type} placeholder={placeholder}  {...(register(name,
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
            <Icons error={error} serverError={serverError} touched={touched}/>
        </div>
    )
}
export const Input = React.memo(InputComponent)