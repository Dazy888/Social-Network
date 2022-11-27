import React, { useRef, useState } from "react"
// Components
import { LoginLoader } from "./components/Loader"
import { Input } from "./components/Input"
// Types
import { LoginInterface } from "./types/login-types"
import { AuthResponse } from "../../models/response/auth-response"
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
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form"

export default React.memo(function SignUp() {
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

    function showPassword() {
        (passRef.current.getAttribute('type') === 'password') ? passRef.current.setAttribute('type', 'text') : passRef.current.setAttribute('type', 'password')
    }

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<LoginInterface>({mode: 'onChange'})
    const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()
        await mutateAsync({userLogin: data.login, password: data.password, token})
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} changeServerError={changeLoginError} placeholder={'Login'}/>
            <Input error={errors.password?.message} touched={touchedFields.password} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
            <div className={'content__checkbox'}>
                <input className={'checkbox__input'} onClick={showPassword} name={'show-password'} type={'checkbox'} />
                <label className={'checkbox__label'}>Show password</label>
            </div>
            <button className={'content__submit'} type={'submit'} disabled={isLoading}>Sign in</button>
            <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isLoading}/>
            <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
        </form>
    )
})