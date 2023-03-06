import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
// Layout
import { AuthorizationPage } from "@/layouts/AuthorizationPage-Layout"
// Captcha
import ReCAPTCHA from "react-google-recaptcha"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { AuthService } from "@/services/auth-service"
// Interfaces
import { AuthPropsI, AuthFormI } from "@/interfaces/authorization-interfaces"
// Store
import { authActions } from "@/store/reducers/auth/auth-reducer"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/authorization/Loader"
// Styles
import styles from '@/styles/Authorization.module.scss'

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

    // const reRef: any = useRef<ReCAPTCHA>()

    const { isLoading, mutateAsync } = useMutation('login', (data: AuthPropsI) => AuthService.login(data.userLogin, data.password, /*data.token*/),
        {
            onSuccess(response) {
                const data = response.data
                successfulEnter(router, dispatch, data.tokens.accessToken, data.user.isActivated)
            },
            onError(error: string) {
                (/W/.test(error)) ? changePasswordError(error) : changeLoginError(error)
            }
        })

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<AuthFormI>({mode: 'onChange'})
    const onSubmit: SubmitHandler<AuthFormI> = async (data) => {
        // const token = await reRef.current.executeAsync()
        // reRef.current.reset()
        await mutateAsync({userLogin: data.login, password: data.password, /*token*/})
    }

    return(
        <AuthorizationPage>
            <Head>
                <title>Sign in</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} changeServerError={changeLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} serverError={passwordError} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} changeServerError={changePasswordError} placeholder={'Password'}/>
                <button className={`${styles['auth__submit']} font-semibold`} type={'submit'} disabled={isLoading}>Sign in</button>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                {/*<ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>*/}
            </form>
        </AuthorizationPage>
    )
})