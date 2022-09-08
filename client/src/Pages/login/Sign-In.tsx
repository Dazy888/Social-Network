// React
import React, {useRef, useState} from "react"
// Formik
import {Field, Form, Formik} from "formik"
// Components
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
import {LoginLoader} from "./components/Loader"
// Types
import {InputController, Login, Navigate, Validate} from "./types/login-types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"

type PropsType = {
    validate: Validate
    login: Login
    navigate: Navigate
    inputController: InputController
}

export function SignIn({login, navigate, inputController, validate}: PropsType) {
    const [userName, changeUserName] = useState<string>('')
    const [loading, changeLoadingStatus] = useState<boolean>(false)
    const [password, changePassword] = useState<string>('')
    const [loginError, changeLoginError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()

    async function submit(email: string, password: string) {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()

        changeLoadingStatus(true)
        const response = await login(email, password, token)
        changeLoadingStatus(false)

        if (response === 200) {
            navigate('/')
        } else if (response.field === 'login') {
            changeLoginError(response.message)
        } else {
            changePasswordError(response.message)
        }
    }

    return(
        <Formik validate={() => validate({userName, password})} initialValues={{userName: '', password: ''}} onSubmit={() => submit(userName, password)}>
            {({ errors, touched }: any) => (
                <Form>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.userName} serverError={loginError} touched={touched.userName}/>
                        <Field value={userName} onChange={(e: any) => inputController(changeUserName, changeLoginError, e.target.value)} className={`${errors.userName && touched.userName || loginError ? 'red-border' : ''}`} name={'userName'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                        <ErrorIcons error={errors.userName} serverError={loginError} touched={touched.userName}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <Field value={password} onChange={(e: any) => inputController(changePassword, changePasswordError, e.target.value)} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
                        <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                    </div>
                    <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Sign in'} />
                    <LoginLoader loading={loading}/>
                    <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                </Form>
            )}
        </Formik>
    )
}