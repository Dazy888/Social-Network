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
// React Query
import { useMutation } from "react-query"
// Redux
import { useDispatch } from "react-redux"
// Service
import { AuthService } from "../../services/auth-service"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Next
import { useRouter } from "next/router"
// Sign in
import { AuthProps, successfulEnter } from "./sign-in"
// Styles
import styles from '../../styles/Authorization.module.scss'
import {AuthorizationLayout} from "../../layouts/AuthorizationLayout";
import Head from "next/head";

export default React.memo(function SignUp() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [loginError, changeLoginError] = useState<string>('')

    // const reRef: any = useRef<ReCAPTCHA>()
    const passRef: any = useRef()

    const { isLoading, mutateAsync } = useMutation('registration',
        (data: AuthProps) => AuthService.registration(data.userLogin, data.password, /*data.token*/),
        {
            onSuccess(response: AxiosResponse<AuthResponse>) {
                const data = response.data
                successfulEnter(router, dispatch, data.accessToken, data.user.isActivated)
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
        // const token = await reRef.current.executeAsync()
        // reRef.current.reset()
        await mutateAsync({userLogin: data.login, password: data.password, /*token*/})
    }

    return(
        <AuthorizationLayout>
            <Head>
                <title>Sign up</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} changeServerError={changeLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
                <div className={styles['content__checkbox']}>
                    <input className={styles['checkbox__input']} onClick={showPassword} name={'show-password'} type={'checkbox'} />
                    <label className={styles['checkbox__label']}>Show password</label>
                </div>
                <button className={styles['auth__submit']} type={'submit'} disabled={isLoading}>Sign in</button>
                <LoginLoader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                {/*<ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>*/}
            </form>
        </AuthorizationLayout>
    )
})