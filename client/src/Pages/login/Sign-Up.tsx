// React
import React, {useEffect, useRef, useState} from "react"
// Formik
import {Formik} from "formik"
// Components
import {LoginLoader} from "./components/Loader"
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
// Types
import {Navigate, Registration, Validate} from "./types/login-types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
import {loaderCSS} from "./Sign-In";

type PropsType = {
    validate: Validate
    registration: Registration
    navigate: Navigate
}


export function SignUp({registration, validate, navigate}: PropsType) {
    const [loginError, changeLoginError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()

    useEffect(() => {
        const input: any = document.querySelector('input[name=userLogin]')
        input.onclick = () => changeLoginError('')
    }, [])

    async function submit(userLogin: string, password: string, setSubmitting: (status: boolean) => void) {
        setSubmitting(true)
        const token = await reRef.current.executeAsync()
        reRef.current.reset()

        const response = await registration(userLogin, password, token)
        console.log(response)
        setSubmitting(false)

        if (response.field) {
            changeLoginError(response.message)
        } else {
            navigate('/profile')
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
        <Formik validate={values => validate(values.userLogin, values.password)} initialValues={{userLogin: '', password: ''}} onSubmit={(values, {setSubmitting}) => submit(values.userLogin, values.password, setSubmitting)}>
            {({
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                  handleSubmit,
                  isSubmitting,
              }) => (
                  <form onSubmit={handleSubmit}>
                      <div className={'error-container'}>
                          <ErrorMessages error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                          <input className={`${errors.userLogin && touched.userLogin || loginError ? 'red-border' : ''}`} value={values.userLogin} onChange={handleChange} onBlur={handleBlur} name={'userLogin'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                          <ErrorIcons error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                      </div>
                      <div className={'error-container'}>
                          <ErrorMessages error={errors.password} touched={touched.password}/>
                          <input className={`${errors.password && touched.password ? 'red-border' : ''}`} value={values.password} onChange={handleChange} onBlur={handleBlur} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
                          <ErrorIcons error={errors.password} touched={touched.password}/>
                      </div>
                      <div className={'content__checkbox'}>
                          <input className={'checkbox__input'} onClick={showPassword} name={'show-password'} type={'checkbox'} />
                          <label className={'checkbox__label'}>Show password</label>
                      </div>
                      <button className={'content__submit'} type={'submit'} disabled={isSubmitting}>Sign up</button>
                      <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isSubmitting}/>
                      <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                  </form>
            )}
        </Formik>
    )
}