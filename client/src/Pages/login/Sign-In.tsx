// React
import React, {CSSProperties, useEffect, useRef, useState} from "react"
// Formik
import {Formik} from "formik"
// Components
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
import {LoginLoader} from "./components/Loader"
// Types
import {Login, Navigate, Validate} from "./types/login-types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"

type PropsType = {
    validate: Validate
    login: Login
    navigate: Navigate
}

export const loaderCSS: CSSProperties = {
    display: "block",
    width: "fit-content",
    position: "relative",
    left: "150px",
    margin: "30px auto",
    borderColor: "red",
}

export function SignIn({login, navigate, validate}: PropsType) {
    const [loginError, changeLoginError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()

    useEffect(() => {
        const inputs = document.querySelectorAll('input')
        for (let i = 0; i < 2; i++) {
            inputs[i].onclick = () => {
                changeLoginError('')
                changePasswordError('')
            }
        }
    }, [])

    async function submit(userLogin: string, password: string, setSubmitting: (status: boolean) => void) {
        setSubmitting(true)
        const token = await reRef.current.executeAsync()
        reRef.current.reset()

        const response = await login(userLogin, password, token)
        setSubmitting(false)

        if (response === 200) {
            navigate('/profile')
        } else if (response.field === 'login') {
            changeLoginError(response.message)
        } else {
            changePasswordError(response.message)
        }
    }

    return(
        <Formik validate={values => validate(values.userLogin, values.password)} initialValues={{userLogin: '', password: ''}} onSubmit={(values, {setSubmitting}) => submit(values.userLogin, values.password, setSubmitting)}>
            {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  values
              }) => (
                  <form onSubmit={handleSubmit}>
                      <div className={'error-container'}>
                          <ErrorMessages error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                          <input value={values.userLogin} onBlur={handleBlur} onChange={handleChange} className={`${errors.userLogin && touched.userLogin || loginError ? 'red-border' : ''}`} name={'userLogin'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                          <ErrorIcons error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                      </div>
                      <div className={'error-container'}>
                          <ErrorMessages error={errors.password} serverError={passwordError} touched={touched.password}/>
                          <input value={values.password} onBlur={handleBlur} onChange={handleChange} className={`${errors.password && touched.password || passwordError ? 'red-border' : ''}`} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
                          <ErrorIcons error={errors.password} serverError={passwordError} touched={touched.password}/>
                      </div>
                      <button className={'content__submit'} type={'submit'} disabled={isSubmitting}>Sign in</button>
                      <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isSubmitting}/>
                      <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                  </form>
            )}
        </Formik>
    )
}