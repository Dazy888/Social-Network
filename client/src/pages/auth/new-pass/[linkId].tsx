import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { notify } from "@/components/pages/auth/form/AuthForm"
import { SubmitHandler, useForm } from "react-hook-form"
// Models
import { INewPassForm, SetNewPassDTO } from "@/models/auth.models"
// Service
import { AuthService } from "@/services/auth.service"
// Styles
import styles from "@/styles/Auth.module.scss"
// Components
import { AuthInput } from "@/components/pages/auth/form/AuthInput"
import { PassRequirements } from "@/components/common/PassRequirements"
import { SubmitBtn } from "@/components/pages/auth/form/SubmitBtn"

const NewPass = () => {
    const router = useRouter()

    const mutationFunc = (data: SetNewPassDTO) => AuthService.setNewPass(data)
    const { isLoading, mutateAsync:setNewPass} = useMutation('set new pass', mutationFunc, {
        onSuccess: (res) => {
            notify('Password successfully changed', 'success')
            setTimeout(() => {
                router.push('/auth/sign-in')
            }, 1000)
        },
        onError: (err: string): any => notify(err, 'error')
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

        await setNewPass({
            newPass: data.newPass,
            recoveryLink: window.location.href
        })
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
