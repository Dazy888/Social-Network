import React, {useRef, useState} from "react"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/redux"
import Head from "next/head"
import styles from "@/styles/Auth.module.scss"
import {AuthInput} from "@/components/pages/auth/form/AuthInput";
import ReCAPTCHA from "react-google-recaptcha";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthForm, IRecoverForm} from "@/models/auth.models";
import {notify} from "@/components/pages/auth/form/AuthForm";
import {useMutation} from "react-query";
import {AuthService} from "@/services/auth.service";
import {successfulEnter} from "@/pages/auth/sign-in";
import {SubmitBtn} from "@/components/pages/auth/form/SubmitBtn";

const SignIn = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const {
        register, handleSubmit, watch,
        setFocus, formState: { errors, touchedFields}
    } = useForm<IRecoverForm>({ mode: 'onSubmit' })

    const email = watch('email')

    const {isLoading, mutateAsync:signIn} = useMutation('recover pass', (data: IRecoverForm) => AuthService.signIn(data),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, res.user.posts, res.user.subscriptions),
            onError: (err: string): any => notify(err, 'error')
        })

    const onSubmit: SubmitHandler<IRecoverForm> = async (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        signIn(data)
    }

    return (
        <>
            <Head>
                <title>Password recover</title>
            </Head>
            <div className={`${styles['auth-wrapper']} flex justify-center py-72 w-full min-h-screen`}>
                <div className={`${styles['auth']} rounded-lg p-8`}>
                    <div>
                        <h1 className={'text-3xl font-medium'}>Password recover</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={''}>
                        <div className={`grid gap-7 mt-10 ${styles['inputs'] || ''}`}>
                            <AuthInput type={'email'} errorMessage={errors.email?.message} isError={!!(errors.email?.message && touchedFields.email)}
                                       register={register} name={'email'} minLength={4} maxLength={10} placeholder={'E-mail'} value={email}
                                       setFocus={setFocus}
                            />
                        </div>
                        <div className={`flex justify-between items-center mt-10 ${styles.submit}`}>
                            <SubmitBtn isLoading={isLoading} value={'Submit'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(SignIn)
