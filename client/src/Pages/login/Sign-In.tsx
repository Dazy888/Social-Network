import {Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {ErrorMessages} from "./components/ErrorMessages";
import {ErrorIcons} from "./components/ErrorIcons";
import {DefaultFunction} from "./Login-Page";
import {LoginLoader} from "./components/Loader";

type PropsType = {
    validate: (values: FormValues) => Object
    login: (email: string, password: string) => any
    navigate: (path: string) => void
    inputController: (changeInputValue: DefaultFunction, changeFieldError: DefaultFunction,  value: string) => void
}

type FormValues = {
    email: string
    password: string
    rememberMe?: boolean
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
        const response: any = await login(email, password)
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