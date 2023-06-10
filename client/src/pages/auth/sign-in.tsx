import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import ReCAPTCHA from "react-google-recaptcha"
import { useMutation } from "react-query"
import { AuthService } from "@/services/auth.service"
import {AuthProps, AuthForm, Tokens} from "@/models/auth"
import { setAuthData } from "@/store/reducers/AuthSlice"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch } from "@/hooks/redux"
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/auth/Loader"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
import {AuthPage, createCookie} from "@/layouts/AuthPage-Layout"

export const successfulEnter = (router: any, dispatch: any, tokens: Tokens, isActivated: boolean) => {
    createCookie('refreshToken', tokens.refreshToken, 30)
    createCookie('accessToken', tokens.accessToken, 15 / (24 * 60))
    // dispatch(setAuthData(isActivated))
    router.push('/main/profile')
}

export const notify = (text: string, type: 'error' | 'success' | 'warning') => toast(text, { type })

const SignIn = () => {
    const reRef: any = useRef<ReCAPTCHA>()
    const [captchaToken, setCaptchaToken] = useState<string | null>('')

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync } = useMutation('login', (data: AuthProps) => AuthService.login(data.login, data.pass),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.data.tokens, res.data.user.isActivated),
            onError: (err: string): any => notify(err, 'error')
        })

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<AuthForm>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<AuthForm  > = async (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')
        await mutateAsync({ login: data.login, pass: data.pass })
    }

    return(
        <AuthPage title={'in'}>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} placeholder={'Login'}/>
                <Input type={'password'} error={errors.pass?.message} touched={touchedFields.pass} register={register} name={'pass'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
                <SubmitBtn isLoading={isLoading} value={'in'}/>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
                <ReCAPTCHA ref={reRef} sitekey={'6LfPBogmAAAAAJ8cP0kTqqd1q2n1RFvIRaTstbMN'} onChange={(value) => setCaptchaToken(value)} className={'my-6'} />
            </form>
        </AuthPage>
    )
}

export default React.memo(SignIn)
