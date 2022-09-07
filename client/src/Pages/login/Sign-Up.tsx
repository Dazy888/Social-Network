// React
import React, {useState} from "react"
// Formik
import {Field, Form, Formik} from "formik"
// Components
import {LoginLoader} from "./components/Loader"
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
// Types
import {InputController, Registration, Response, Validate} from "./types/login-types"

type PropsType = {
    setModalStatus: (status: boolean) => void
    validate: Validate
    registration: Registration
    inputController: InputController
}

export function SignUp({registration, validate, inputController, setModalStatus}: PropsType) {
    const [email, changeEmail] = useState<string>('')
    const [loading, changeLoadingStatus] = useState<boolean>(false)
    const [password, changePassword] = useState<string>('')
    const [emailError, changeEmailError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')

    async function submit(email: string, password: string) {
        const submit: any = document.querySelector('input[name=submit]')
        submit.setAttribute('disabled', 'disabled')

        changeLoadingStatus(true)
        const response: Response = await registration(email, password)
        changeLoadingStatus(false)

        setModalStatus(true)

        if (response.field === 'email' || /User with this/.test(response.message)) {
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
        <div>
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
                            <Field className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} value={password} onChange={(e: any) => inputController(changePassword, changePasswordError, e.target.value)} name={'password'} type={'password'} placeholder={'Your Password'} minLength={8} maxLength={10}/>
                            <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                        </div>
                        <div className={'content__checkbox'}>
                            <Field className={'checkbox__input'} onClick={showPassword} name={'rememberMe'} type={'checkbox'} />
                            <label>Show password</label>
                        </div>
                        <Field className={'content__submit'} name={'submit'} type={'submit'} value={'Sign up'} />
                        <LoginLoader loading={loading}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}