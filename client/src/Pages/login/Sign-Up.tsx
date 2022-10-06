import React, {useRef, useState} from "react"
// Formik
import {Formik} from "formik"
// Components
import {LoginLoader} from "./components/Loader"
import {ErrorMessages} from "./components/ErrorMessages"
import {ErrorIcons} from "./components/ErrorIcons"
// Types
import {Registration, Validate} from "./types/Login-Types"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
// CSS
import {loaderCSS} from "./Sign-In"
// Navigation
import {useNavigate} from "react-router-dom"

type PropsType = {
    validate: Validate
    registration: Registration
}

export default React.memo(function SignUp({registration, validate}: PropsType) {
    const navigate = useNavigate()
    const [loginError, changeLoginError] = useState<string>('')
    const reRef: any = useRef<ReCAPTCHA>()
    const passRef: any = useRef()

    async function submit(userLogin: string, password: string, setSubmitting: (status: boolean) => void) {
        setSubmitting(true)
        const token = await reRef.current.executeAsync()
        reRef.current.reset()

        const response = await registration(userLogin, password, token)
        if (response) return changeLoginError(response)

        navigate('/profile')
        setSubmitting(false)
    }

    function showPassword() {
        (passRef.current.getAttribute('type') === 'password') ? passRef.current.setAttribute('type', 'text') : passRef.current.setAttribute('type', 'password')
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
                        <input onClick={() => changeLoginError('')} className={`${errors.userLogin && touched.userLogin || loginError ? 'red-border' : ''}`} value={values.userLogin} onChange={handleChange} onBlur={handleBlur} name={'userLogin'} type={'text'} placeholder={'Your login'} minLength={4} maxLength={10}/>
                        <ErrorIcons error={errors.userLogin} serverError={loginError} touched={touched.userLogin}/>
                    </div>
                    <div className={'error-container'}>
                        <ErrorMessages error={errors.password} touched={touched.password}/>
                        <input ref={passRef} className={`${errors.password && touched.password ? 'red-border' : ''}`} value={values.password} onChange={handleChange} onBlur={handleBlur} name={'password'} type={'password'} placeholder={'Your password'} minLength={8} maxLength={15}/>
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
})