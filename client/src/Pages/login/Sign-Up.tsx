import {Field, Form, Formik} from "formik"
import React, {useState} from "react"
import {LoginLoader} from "./components/Loader"
import {ErrorMessages} from "./components/ErrorMessages";
import {ErrorIcons} from "./components/ErrorIcons";
import {DefaultFunction} from "./Login-Page";

type PropsType = {
    validate: (values: any) => Object
    registration: (email: string, password: string) => any
    navigate: (path: string) => void
    inputController: (changeInputValue: DefaultFunction, changeFieldError: DefaultFunction,  value: string) => void
}

export function SignUp({registration, navigate, validate, inputController}: PropsType) {
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
                        <ErrorMessages error={errors.email} serverError={emailError} touched={touched.email}/>
                        <Field className={`${errors.email && touched.email || emailError ? 'red-border' : ''}`} value={email} onChange={(e: any) => inputController(changeEmail, changeEmailError, e.target.value)} name={'email'} type={'email'} placeholder={'Your Email'}/>
                        <ErrorIcons error={errors.email} serverError={emailError} touched={touched.email}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <Field value={password} minLength={8} maxLength={10} onChange={(e: any) => inputController(changePassword, changePasswordError, e.target.value)} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your Password'}/>
                        <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
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