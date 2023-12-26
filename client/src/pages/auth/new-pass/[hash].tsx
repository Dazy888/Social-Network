import React, {useRef, useState} from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { useAppDispatch } from "@/hooks/redux"
import { successfulEnter } from "@/pages/auth/sign-in"
import {AuthForm, notify} from "@/components/pages/auth/form/AuthForm"
// Models
import { IAuthForm } from "@/models/auth.models"
// Service
import { AuthService } from "@/services/auth.service"
// Components
import { AuthPage } from "@/layouts/AuthLayout"
import styles from "@/styles/Auth.module.scss";
import {AuthInput} from "@/components/pages/auth/form/AuthInput";
import {PassRequirements} from "@/components/common/PassRequirements";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {SubmitBtn} from "@/components/pages/auth/form/SubmitBtn";
import Head from "next/head";
import {SubmitHandler, useForm} from "react-hook-form";

const NewPass = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const mutationKey = 'sign up'
    const mutationFunc = (data: IAuthForm) => AuthService.signUp(data)

    const {
        isLoading,
        mutateAsync:signUp
    } = useMutation(mutationKey, mutationFunc, {
        onSuccess: (res) => {
            successfulEnter(
                router,
                dispatch,
                res.tokens,
                res.user,
                [],
                {
                    followers: [],
                    followings: []
                }
            )
        },
        onError: (err: string): any => notify(err, 'warning')
    })

    const reRef: any = useRef<ReCAPTCHA>()
    const [captchaToken, setCaptchaToken] = useState<string | null>('')

    const {
        register, handleSubmit, watch,
        setFocus, formState: { errors, touchedFields}
    } = useForm<IAuthForm>({ mode: 'onSubmit' })

    const userName = watch('username')
    const pass = watch('pass')

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')
        signUp(data)
    }

    return (
        <>
            <Head>
                <title>New password</title>
            </Head>
            <div className={`${styles['auth-wrapper']} flex justify-center py-72 w-full min-h-screen`}>
                <div className={`${styles['auth']} rounded-lg p-8`}>
                    <div>
                        <h1 className={'text-3xl font-medium'}>New password</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={''}>
                        <div className={`grid gap-7 mt-10 ${styles['inputs'] || ''}`}>
                            <AuthInput type={'text'} errorMessage={errors.username?.message} isError={!!(errors.username?.message && touchedFields.username)}
                                       register={register} name={'username'} patternValue={/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/} minLength={4} maxLength={10}
                                       placeholder={'Login'} value={userName} setFocus={setFocus}
                            />
                            <AuthInput type={'password'} register={register} name={'pass'} isError={!!(errors.pass?.message && touchedFields.pass)}
                                       minLength={8} maxLength={15} placeholder={'Password'} setFocus={setFocus} value={pass}
                                       patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/}
                            />
                        </div>
                        <PassRequirements isMinLength={pass?.length > 7} isOneDigit={/\d/g.test(pass)} isUppLetter={/[A-Z]/g.test(pass)}
                                          className={styles['pass-requirement']} isLowLetter={/[a-z]/g.test(pass || '')}
                                          isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(pass)}
                        />
                        <ReCAPTCHA ref={reRef} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={'normal'} className={styles.captcha}
                                   onChange={(value) => setCaptchaToken(value)}
                        />
                        <div className={`flex justify-between items-center ${styles.submit}`}>
                            <SubmitBtn isLoading={isLoading} value={'Submit'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(NewPass)
