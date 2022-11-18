import React, { useRef, useState } from "react"
// Formik
import { Formik } from "formik"
// Components
import { LoginLoader } from "./components/Loader"
import { ErrorMessages } from "./components/ErrorMessages"
import { ErrorIcons } from "./components/ErrorIcons"
// Types
import { Validate } from "./types/login-types"
import { AuthResponse } from "../../models/response/auth-response";
import { AxiosResponse } from "axios"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
// Sign in
import { AuthProps, loaderCSS, successfulEnter } from "./Sign-In"
// Navigation
import { useNavigate } from "react-router-dom"
// React Query
import { useMutation } from "react-query"
// Redux
import { useDispatch } from "react-redux"
// Service
import { AuthService } from "../../services/auth-service"

type PropsType = {
    validate: Validate
}

export default React.memo(function SignUp({ validate }: PropsType) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginError, changeLoginError] = useState<string>('')

    const reRef: any = useRef<ReCAPTCHA>()
    const passRef: any = useRef()

    const { isLoading, mutateAsync } = useMutation('registration',
        (data: AuthProps) => AuthService.registration(data.userLogin, data.password, data.token),
        {
            onSuccess(response: AxiosResponse<AuthResponse>) {
                const data = response.data
                successfulEnter(navigate, dispatch, data.accessToken, data.user.isActivated)
            },
            onError() {
                changeLoginError('User with this login already exists')
            }
        })

    async function submit(userLogin: string, password: string) {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()
        await mutateAsync({userLogin, password, token})
    }

    function showPassword() {
        (passRef.current.getAttribute('type') === 'password') ? passRef.current.setAttribute('type', 'text') : passRef.current.setAttribute('type', 'password')
    }

    return(
        <Formik validate={values => validate(values.userLogin, values.password)} initialValues={{userLogin: '', password: ''}} onSubmit={(values) => submit(values.userLogin, values.password)}>
            {({
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                  handleSubmit,
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
                    <button className={'content__submit'} type={'submit'} disabled={isLoading}>Sign up</button>
                    <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isLoading}/>
                    <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
                </form>
            )}
        </Formik>
    )
})