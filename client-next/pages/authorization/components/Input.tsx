import { ErrorMessages } from "./ErrorMessages"
import { ErrorIcons } from "./ErrorIcons"
import styles from '../../../styles/Authorization.module.scss'

type PropsType = {
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
    linkRef?: any
}

export function Input({ className, error, touched, serverError, register, patternValue, maxLength, minLength, name, changeServerError, placeholder, type, linkRef }: PropsType) {
    function changingServerError() {
        if (changeServerError) changeServerError('')
    }

    return(
        <div className={styles['error-container']}>
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
                }))} ref={linkRef} onClick={changingServerError} className={`${error && touched || serverError ? `${styles['red-border']} ${className}` : `${className}`}`} type={type} placeholder={placeholder}/>
            <ErrorIcons error={error} serverError={serverError} touched={touched}></ErrorIcons>
        </div>
    )
}