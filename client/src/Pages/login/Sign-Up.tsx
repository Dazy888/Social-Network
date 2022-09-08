// React
import React, {useRef, useState} from "react"
// Formik
import {Field, Form, Formik} from "formik"
// Components
import {LoginLoader} from "./components/Loader"
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
// Types
import {InputController, Navigate, Registration, Validate} from "./types/login-types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"

type PropsType = {
    validate: Validate
    registration: Registration
    inputController: InputController
    navigate: Navigate
}

export function SignUp({registration, validate, inputController, navigate}: PropsType) {
    const [userName, changeUserName] = useState<string>('')
    const [loading, changeLoadingStatus] = useState<boolean>(false)
    const [password, changePassword] = useState<string>('')
    const [loginError, changeLoginError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()

    async function submit(login: string, password: string) {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()

        changeLoadingStatus(true)
        const response = await registration(login, password, token)
        changeLoadingStatus(false)

        if (response.field) {
            changeLoginError(response.message)
        } else {
            navigate('/')
        }
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
        <Formik validate={() => validate({userName, password})} initialValues={{userName: '', password: ''}} onSubmit={() => submit(userName, password)}>
            {({ errors, touched }: any) => (
                <Form>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.userName} serverError={loginError} touched={touched.userName}/>
                        <Field className={`${errors.userName && touched.userName || loginError ? 'red-border' : ''}`} value={userName} onChange={(e: any) => inputController(changeUserName, changeLoginError, e.target.value)} name={'userName'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                        <ErrorIcons error={errors.userName} serverError={loginError} touched={touched.userName}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <Field className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} value={password} onChange={(e: any) => inputController(changePassword, changePasswordError, e.target.value)} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
                        <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                    </div>
                    <div className={'content__checkbox'}>
                        <Field className={'checkbox__input'} onClick={showPassword} name={'rememberMe'} type={'checkbox'} />
                        <label>Show password</label>
                    </div>
                    <Field disabed={loading ? 'disabled' : null} className={'content__submit'} name={'submit'} type={'submit'} value={'Sign up'} />
                    <LoginLoader loading={loading}/>
                    <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                </Form>
            )}
        </Formik>
    )
}