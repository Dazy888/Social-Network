import React from "react"
import { ErrorMessages } from "./ErrorMessages"
import { ErrorIcons } from "./ErrorIcons"

type PropsType = {
    error: string | undefined
    touched: boolean | undefined
    register: any
    name: string
    patternValue: RegExp
    minLength: number
    maxLength: number
    placeholder: string
    type: string
    className?: string
    serverError?: string
    changeServerError?: any
}

export function Input({ className, error, touched, serverError, register, patternValue, maxLength, minLength, name, changeServerError, placeholder, type }: PropsType) {
    return(
        <div className={'error-container'}>
            <ErrorMessages error={error} serverError={serverError} touched={touched}/>
            <input {...(register(
                name,
                {
                    required: 'Field is required',
                    pattern: {
                        value: patternValue,
                        message: `Invalid ${name}`
                    },
                    minLength: {
                      value: minLength,
                      message: `Minlength is ${minLength} symbols`
                    },
                    maxLength: {
                        value: maxLength,
                        message: `MaxLength is ${maxLength} symbols`
                    },
                }))} onClick={() => changeServerError('')} className={`${error && touched || serverError ? `red-border ${className}` : `${className}`}`} type={type} placeholder={placeholder}/>
            <ErrorIcons error={error} serverError={serverError} touched={touched}></ErrorIcons>
        </div>
    )
}