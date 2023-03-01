import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
// Components
import { Loader } from "@/components/authorization/Loader"
import { Input } from "@/components/authorization/Input"
// Typification
import { AuthPropsI, AuthFormI } from "@/interfaces/authorization-interfaces"
// Recaptcha
import ReCAPTCHA from "react-google-recaptcha"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { AuthService } from "@/services/auth-service"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Sign in
import { successfulEnter } from "./sign-in"
// Styles
import styles from '@/styles/Authorization.module.scss'
// Layout
import { AuthorizationPage } from "@/layouts/AuthorizationPage-Layout"

const SignUp = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [loginError, changeLoginError] = useState<string>('')

    const { isLoading, mutateAsync } = useMutation('registration',
        (data: AuthPropsI) => AuthService.registration(data.userLogin, data.password, /*data.token*/),
        {
            onSuccess(response) {
                const data = response.data
                successfulEnter(router, dispatch, data.tokens.accessToken, data.user.isActivated)
            },
            onError() {
                changeLoginError('User with this login already exists')
            }
        })

    function showPassword() {
        const input: any = document.querySelector('input[name=password]')
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<AuthFormI>({mode: 'onChange'})

    const onSubmit: SubmitHandler<AuthFormI> = async (data) => {
        // const token = await reRef.current.executeAsync()
        // reRef.current.reset()
        await mutateAsync({userLogin: data.login, password: data.password, /*token*/})
    }

    return(
        <AuthorizationPage>
            <Head>
                <title>Sign up</title>
            </Head>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} serverError={loginError} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} changeServerError={changeLoginError} placeholder={'Login'}/>
                <Input type={'password'} error={errors.password?.message} touched={touchedFields.password} register={register} name={'password'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
                <div className={`${styles['auth__checkbox']} flex items-center mb-7`}>
                    <input onClick={showPassword} name={'show-password'} type={'checkbox'}/>
                    <label>Show password</label>
                </div>
                <button className={`${styles['auth__submit']} font-semibold`} type={'submit'} disabled={isLoading}>Sign up</button>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                {/*<ReCAPTCHA className={'captcha'} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={"invisible"} ref={reRef}/>*/}
            </form>
        </AuthorizationPage>
    )
}

export default React.memo(SignUp)