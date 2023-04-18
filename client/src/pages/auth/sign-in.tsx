import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
// Layout
import { AuthPage } from "@/layouts/AuthPage-Layout"
// Captcha
import ReCAPTCHA from "react-google-recaptcha"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { AuthService } from "@/services/auth.service"
// Models
import { AuthProps, IAuthForm } from "@/models/auth"
// Store
import { setAuthData } from "@/store/reducers/AuthSlice"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/auth/Loader"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
// Hooks
import { useAppDispatch } from "@/hooks/redux"

export const successfulEnter = (router: any, dispatch: any, accessToken: string, isActivated: boolean) => {
    localStorage.setItem('token', accessToken)
    dispatch(setAuthData(isActivated))
    router.push('/main/profile')
}

const SignIn = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [loginError, setLoginError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // const reRef: any = useRef<ReCAPTCHA>()

    const { isLoading, mutateAsync } = useMutation('login', (data: AuthProps) => AuthService.login(data.userLogin, data.password, /*data.token*/),
        {
            onSuccess(response) {
                const data = response.data
                successfulEnter(router, dispatch, data.tokens.accessToken, data.user.isActivated)
            },
            onError(error: string) {
                (/W/.test(error)) ? setPasswordError(error) : setLoginError(error)
            }
        })

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IAuthForm>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        // const token = await reRef.current.executeAsync()
        // reRef.current.reset()
        await mutateAsync({ userLogin: data.login, password: data.password, /*token*/ })
    }

    return(
        <AuthPage>
            <Head>
                <title>Sign in</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} setServerError={setLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} serverError={passwordError} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} setServerError={setPasswordError} placeholder={'Password'}/>
                <SubmitBtn isLoading={isLoading} value={'in'}/>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                {/*<ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>*/}
            </form>
        </AuthPage>
    )
}

export default React.memo(SignIn)
