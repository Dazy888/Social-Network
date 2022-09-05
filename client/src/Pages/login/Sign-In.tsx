// React
import React, {useState} from "react"
// Formik
import {Field, Form, Formik} from "formik"
// Components
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
import {LoginLoader} from "./components/Loader"
// Types
import {InputController, Login, Navigate, Response, Validate} from "./types/login-types"

type PropsType = {
    validate: Validate
    login: Login
    navigate: Navigate
    inputController: InputController
}

export function SignIn({login, navigate, inputController, validate}: PropsType) {
    const [email, changeEmail] = useState<string>('')
    const [loading, changeLoadingStatus] = useState<boolean>(false)
    const [password, changePassword] = useState<string>('')
    const [emailError, changeEmailError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')

    async function submit(email: string, password: string) {
        // const checkBox: any = document.querySelector('input[name=rememberMe]')
        changeLoadingStatus(true)
        const response: Response = await login(email, password)
        changeLoadingStatus(false)

        if (response === 200) {
            navigate('/')
        } else if (response.field === 'email') {
            changeEmailError(response.message)
        } else {
            changePasswordError(response.message)
        }
    }

    return(
        <Formik validate={() => validate({email, password})} initialValues={{email: '', password: '', rememberMe: false}} onSubmit={() => submit(email, password)}>
            {({ errors, touched }: any) => (
                <Form>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.email} serverError={emailError} touched={touched.email}/>
                        <Field value={email} onChange={(e: any) => inputController(changeEmail, changeEmailError, e.target.value)} className={`${errors.email && touched.email || emailError ? 'red-border' : ''}`} name={'email'} type={'email'} placeholder={'Your Email'}/>
                        <ErrorIcons error={errors.email} serverError={emailError} touched={touched.email}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <Field value={password} onChange={(e: any) => inputController(changePassword, changePasswordError, e.target.value)} minLength={8} maxLength={10} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your Password'} />
                        <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                    </div>
                    {/*<div className={'content__checkbox'}>*/}
                    {/*    <Field className={'checkbox__input'} name={'rememberMe'} type={'checkbox'} />*/}
                    {/*    <label>Remember Me</label>*/}
                    {/*</div>*/}
                    <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Sign in'} />
                    <LoginLoader loading={loading}/>
                </Form>
            )}
        </Formik>
    )
}