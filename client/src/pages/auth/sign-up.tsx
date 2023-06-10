import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { AuthForm, AuthProps } from "@/models/auth"
import ReCAPTCHA from "react-google-recaptcha"
import { useMutation } from "react-query"
import { AuthService } from "@/services/auth.service"
import { SubmitHandler, useForm } from "react-hook-form"
import { notify, successfulEnter } from "@/pages/auth/sign-in"
import styles from '@/styles/Authorization.module.scss'
import { useAppDispatch } from "@/hooks/redux"
// Components
import { Loader } from "@/components/auth/Loader"
import { Input } from "@/components/common/Input"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
import { AuthPage } from "@/layouts/AuthPage-Layout"

const SignUp = () => {
    const reRef: any = useRef<ReCAPTCHA>()
    const [captchaToken, setCaptchaToken] = useState<string | null>('')

    const [passInpType, setPassInpType] = useState<'password' | 'text'>('password')

    const router = useRouter()
    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync:signUp } = useMutation('sign up', (data: AuthProps) => AuthService.registration(data.login, data.pass),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.data.tokens.accessToken, res.data.user.isActivated),
            onError: (err: string): any => notify(err, 'warning')
        })

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<AuthForm>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<AuthForm> = async (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')
        await signUp({ login: data.login, pass: data.pass })
    }

    return(
        <AuthPage title={'up'}>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                <Input type={'text'} error={errors.login?.message} touched={touchedFields.login} register={register} name={'login'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} placeholder={'Login'}/>
                <Input type={'password'} error={errors.pass?.message} touched={touchedFields.pass} register={register} name={'pass'} patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}/>
                <div className={`${styles['auth__checkbox']} flex items-center mb-7`}>
                    <input className={'w-5 h-5 mr-2.5'} onClick={() => ((passInpType === 'password') ? setPassInpType('text') : setPassInpType('password'))} name={'show-pass'} type={'checkbox'}/>
                    <label>Show password</label>
                </div>
                <ReCAPTCHA ref={reRef} sitekey={'6LfPBogmAAAAAJ8cP0kTqqd1q2n1RFvIRaTstbMN'} onChange={(value) => setCaptchaToken(value)} className={'my-6'} />
                <SubmitBtn isLoading={isLoading} value={'up'}/>
                <Loader color={'rgb(249, 94, 59)'} loading={isLoading}/>
            </form>
        </AuthPage>
    )
}

export default React.memo(SignUp)
