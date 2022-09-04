import {Field, Form, Formik} from "formik"
import React, {useState} from "react"
import {LoginLoader} from "./Loader"

type PropsType = {
    validate: (values: any) => Object
    registration: (email: string, password: string) => any
    navigate: (path: string) => void
}

type ErrorTextsPropsType = {
    error: string
    serverError: string
    touched: string
}

export function SignUp({registration, navigate, validate}: PropsType) {
    const [email, changeEmail] = useState<string>('')
    const [loading, changeLoadingStatus] = useState<boolean>(false)
    const [password, changePassword] = useState<string>('')
    const [emailError, changeEmailError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')

    async function submit(email: string, password: string) {
        changeLoadingStatus(true)
        const response = await registration(email, password)
        changeLoadingStatus(false)

        if (response === 200) {
            navigate('/')
        } else if (response.fieldName === 'email' || /User with this/.test(response.message)) {
            changeEmailError(response.message)
        } else {
            changePasswordError(response.message)
        }
    }


    function inputController(changeFunc: (value: string) => void, value: string, e: any): void {
        changeEmailError('')
        changePasswordError('')
        changeFunc(value)
    }

    function ErrorTexts({serverError, error, touched}: ErrorTextsPropsType) {
        return(
            <div>
                {error && touched ? <span className={'error-text'}>{error}</span> : null}
                {serverError ? <span className={'error-text'}>{serverError}</span> : null}
            </div>
        )
    }

    function ErrorCircles({serverError, error, touched}: ErrorTextsPropsType) {
        return(
            <div>
                {error && touched ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
                {serverError ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
            </div>
        )
    }

    function showPassword() {
        const input: any = document.querySelector('input[name=password]')

        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    return(
        <Formik validate={() => validate({email, password})} initialValues={{email: '', password: ''}} onSubmit={() => submit(email, password)}>
            {({ errors, touched }: any) => (
                <Form>
                    <div className={'error-container'}>
                        <ErrorTexts error={errors.email} serverError={emailError} touched={touched.email}/>
                        <Field className={`${errors.email && touched.email || emailError ? 'red-border' : ''}`} value={email} onChange={(e: any) => inputController(changeEmail, e.target.value, e)} name={'email'} type={'email'} placeholder={'Your Email'}/>
                        <ErrorCircles error={errors.email} serverError={emailError} touched={touched.email}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorTexts error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <Field value={password} minLength={8} maxLength={10} onChange={(e: any) => inputController(changePassword, e.target.value, e)} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your Password'}/>
                        <ErrorCircles error={errors.password} serverError={passwordError} touched={touched.password}/>
                    </div>
                    <div className={'content__checkbox'}>
                        <Field onClick={showPassword} className={'checkbox__input'} name={'rememberMe'} type={'checkbox'} />
                        <label>Show password</label>
                    </div>
                    <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Sign up'} />
                    <LoginLoader loading={loading}/>
                </Form>
            )}
        </Formik>
    )
}