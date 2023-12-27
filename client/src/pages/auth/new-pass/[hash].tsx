import React, {useRef, useState} from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { useAppDispatch } from "@/hooks/redux"
import { successfulEnter } from "@/pages/auth/sign-in"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Models
import {IAuthForm, INewPassForm} from "@/models/auth.models"
// Service
import { AuthService } from "@/services/auth.service"
// Components
import styles from "@/styles/Auth.module.scss";
import {AuthInput} from "@/components/pages/auth/form/AuthInput";
import {PassRequirements} from "@/components/common/PassRequirements";
import ReCAPTCHA from "react-google-recaptcha";
import {SubmitBtn} from "@/components/pages/auth/form/SubmitBtn";
import Head from "next/head";
import {SubmitHandler, useForm} from "react-hook-form";

const NewPass = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const mutationKey = 'sign up'
    const mutationFunc = (data: IAuthForm) => AuthService.signUp(data)

    const {isLoading, mutateAsync:signUp} = useMutation(mutationKey, mutationFunc, {
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

    const {
        register, handleSubmit, watch,
        setFocus, formState: { errors, touchedFields}
    } = useForm<INewPassForm>({ mode: 'onSubmit' })

    const newPass = watch('newPass')
    const confirmPass = watch('confirmPass')

    const onSubmit: SubmitHandler<INewPassForm> = async (data) => {
        if (isLoading) return notify('Too many requests', 'warning')
        if (confirmPass !== newPass) return notify(`Passwords don't match`, 'warning')
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
                        <div className={`grid gap-7 my-10 ${styles['inputs'] || ''}`}>
                            <AuthInput type={'password'} register={register} name={'newPass'} isError={!!(errors.newPass?.message && touchedFields.newPass)}
                                       minLength={8} maxLength={15} placeholder={'New password'} setFocus={setFocus} value={newPass}
                                       patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/}
                            />
                            <AuthInput type={'password'} register={register} name={'confirmPass'} isError={!!(errors.confirmPass?.message && touchedFields.confirmPass)}
                                       minLength={8} maxLength={15} placeholder={'Confirm password'} setFocus={setFocus} value={confirmPass}
                                       patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/}
                            />
                        </div>
                        <PassRequirements isMinLength={confirmPass?.length > 7} isOneDigit={/\d/g.test(confirmPass)} isUppLetter={/[A-Z]/g.test(confirmPass)}
                                          className={styles['pass-requirement']} isLowLetter={/[a-z]/g.test(confirmPass || '')}
                                          isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(confirmPass)}
                        />
                        <div className={`flex justify-between items-center mt-10 ${styles.submit}`}>
                            <SubmitBtn isLoading={isLoading} value={'Submit'} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(NewPass)
