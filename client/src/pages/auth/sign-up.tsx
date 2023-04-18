import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
// Components
import { Loader } from "@/components/auth/Loader"
import { Input } from "@/components/common/Input"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
// Models
import { AuthProps, IAuthForm } from "@/models/auth"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { AuthService } from "@/services/auth.service"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Functions
import { successfulEnter } from "@/pages/auth/sign-in"
// Styles
import styles from '@/styles/Authorization.module.scss'
// Layout
import { AuthPage } from "@/layouts/AuthPage-Layout"
// Hooks
import { useAppDispatch } from "@/hooks/redux"

const SignUp = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [loginError, setLoginError] = useState('')

    const { isLoading, mutateAsync } = useMutation('registration', (data: AuthProps) => AuthService.registration(data.userLogin, data.password, /*data.token*/),
        {
            onSuccess(response) {
                const data = response.data
                successfulEnter(router, dispatch, data.tokens.accessToken, data.user.isActivated)
            },
            onError() {
                setLoginError('User with this login already exists')
            }
        })

    const showPassword = () => {
        const input: any = document.querySelector('input[name=password]')

        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IAuthForm>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        // const token = await reRef.current.executeAsync()
        // reRef.current.reset()
        await mutateAsync({ userLogin: data.login, password: data.password, /*token*/ })
    }

    return(
        <AuthPage>
            <Head>
                <title>Sign up</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} setServerError={setLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
                <div className={`${styles['auth__checkbox']} flex items-center mb-7`}>
                    <input onClick={showPassword} name={'show-password'} type={'checkbox'}/>
                    <label>Show password</label>
                </div>
                <SubmitBtn isLoading={isLoading} value={'up'}/>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                {/*<ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>*/}
            </form>
        </AuthPage>
    )
}

export default React.memo(SignUp)
