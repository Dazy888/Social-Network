import React, { CSSProperties, useRef, useState } from "react"
// Layout
import { AuthorizationLayout } from "../../layouts/AuthorizationLayout"
// Navigation
import { useRouter } from "next/router"
// Redux
import { useDispatch } from "react-redux"
// Captcha
import ReCAPTCHA from "react-google-recaptcha"
// React Query
import { useMutation } from "react-query"
// Service
import { AuthService } from "../../services/auth-service"
// Types
import { AxiosResponse } from "axios"
import { AuthResponse } from "../../models/response/auth-response"
import { LoginInterface } from "./types/login-types"
// Store
import { authActions } from "../../store/reducers/auth/auth-reducer"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Next
import Head from "next/head"
// Components
import { Input } from "./components/Input"
import { LoginLoader } from "./components/Loader"
// Styles
import styles from '../../styles/Authorization.module.scss'

export const loaderCSS: CSSProperties = {
    display: "block",
    width: "fit-content",
    position: "relative",
    left: "150px",
    margin: "30px auto",
    borderColor: "red"
}

export type AuthProps = {
    userLogin: string
    password: string
    token: string
}

export function successfulEnter(router: any, dispatch: any, accessToken: string, isActivated: boolean) {
    localStorage.setItem('token', accessToken)
    dispatch(authActions.setAuthData(isActivated))
    router.push('/main/profile')
}

export default React.memo(function SignIn() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [loginError, changeLoginError] = useState<string>('')
    const [passwordError, changePasswordError] = useState<string>('')

    const reRef: any = useRef<ReCAPTCHA>()

    const { isLoading, mutateAsync } = useMutation('login',
        (data: AuthProps) => AuthService.login(data.userLogin, data.password, data.token),
        {
            onSuccess(response: AxiosResponse<AuthResponse>) {
                const data = response.data
                successfulEnter(router, dispatch, data.accessToken, data.user.isActivated)
            },
            onError(error: string) {
                (/W/.test(error)) ? changePasswordError(error) : changeLoginError(error)
            }
        })

    const {register, handleSubmit, formState: { errors, touchedFields }, reset, resetField, getValues, getFieldState, watch} = useForm<LoginInterface>({mode: 'onChange'})
    // const watchName = watch('name')

    const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
        const token = await reRef.current.executeAsync()
        reRef.current.reset()
        await mutateAsync({userLogin: data.login, password: data.password, token})
    }

    return(
        <AuthorizationLayout>
            <Head>
                <title>Sign in</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} changeServerError={changeLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} serverError={passwordError} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} changeServerError={changePasswordError} placeholder={'Password'}/>
                <button className={styles['auth__submit']} type={'submit'} disabled={isLoading}>Sign in</button>
                <LoginLoader color={'rgb(249, 94, 59)'} css={loaderCSS} loading={isLoading}/>
                <ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>
            </form>
        </AuthorizationLayout>
    )
})