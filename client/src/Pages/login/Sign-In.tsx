// React
import React, { CSSProperties, useRef, useState } from "react"
// Formik
import { Formik } from "formik"
// Components
import { ErrorMessages } from "./components/ErrorMessages"
import { ErrorIcons } from "./components/ErrorIcons"
import { LoginLoader } from "./components/Loader"
// Types
import { Authorization, Validate } from "./types/Login-Types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
// Navigation
import { useNavigate } from "react-router-dom"
// React Query
import { useMutation } from "react-query"
// Service
import { AuthService } from "../../services/AuthService"

type PropsType = {
    validate: Validate
    authorization: Authorization
}

export const loaderCSS: CSSProperties = {
    display: "block",
    width: "fit-content",
    position: "relative",
    left: "150px",
    margin: "30px auto",
    borderColor: "red",
}

export type AuthProps = {
    userLogin: string
    password: string
    token: string
}

export function successfulEnter(navigate: (path: string) => void, authorization: Authorization, accessToken: string, isActivated: boolean) {
    authorization(accessToken, isActivated)
    navigate('/main/profile')
}

export default React.memo(function SignIn({validate, authorization}: PropsType) {
    const navigate = useNavigate()
    const [loginError, changeLoginError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()

    const {isLoading, mutateAsync} = useMutation('login',
        (data: AuthProps) => AuthService.login(data.userLogin, data.password, data.token),
        {
            onSuccess(response) {
                if (response.status === 201) {
                    const data = response.data
                    successfulEnter(navigate, authorization, data.accessToken, data.user.isActivated)
                } else {
                    const message = response.data.message

                    if (/W/.test(message)) {
                        changePasswordError(message)
                    } else {
                        changeLoginError(message)
                    }
                }
            },
        })

    async function submit(userLogin: string, password: string) {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()
        await mutateAsync({userLogin, password, token})
    }

    return(
        <Formik validate={values => validate(values.userLogin, values.password)} initialValues={{userLogin: '', password: ''}} onSubmit={(values) => submit(values.userLogin, values.password)}>
            {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                        <input onClick={() => changeLoginError('')} value={values.userLogin} onBlur={handleBlur} onChange={handleChange} className={`${errors.userLogin && touched.userLogin || loginError ? 'red-border' : ''}`} name={'userLogin'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                        <ErrorIcons error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                        <input onClick={() => changePasswordError('')} value={values.password} onBlur={handleBlur} onChange={handleChange} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
                        <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                    </div>
                    <button className={'content__submit'} type={'submit'} disabled={isLoading}>Sign in</button>
                    <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isLoading}/>
                    <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                </form>
            )}
        </Formik>
    )
})