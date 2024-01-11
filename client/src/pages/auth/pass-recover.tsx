import React, { useState } from "react"
import Head from "next/head"
import { useMutation } from "react-query"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Styles
import styles from "@/styles/Auth.module.scss"
// Components
import { AuthInput } from "@/components/pages/auth/form/AuthInput"
import { SubmitBtn } from "@/components/pages/auth/form/SubmitBtn"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Models
import { IRecoverForm } from "@/models/auth.models"
// Services
import { AuthService } from "@/services/auth.service"

const PassRecover = () => {
    const [mailSent, setMailSent] = useState<boolean>(false)

    const {
        register, handleSubmit, watch,
        setFocus, formState: { errors, touchedFields}
    } = useForm<IRecoverForm>({ mode: 'onSubmit' })

    const email = watch('email')

    const { isLoading, mutateAsync:recoverPass} = useMutation(
        'recover pass',
        (data: IRecoverForm) => AuthService.recoverPass(data),
        {
            onSuccess: () => setMailSent(true),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const onSubmit: SubmitHandler<IRecoverForm> = async (data) => {
        if (isLoading) return notify('Too many requests', 'warning')
        await recoverPass(data)
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
                    <div className={`${mailSent ? 'flex-center' : ''} mt-32`}>
                        { mailSent
                            ?   <div className={'flex items-center flex-col text-center'}>
                                    <h3 className={'text-xl mb-1'}>A recovery link has been sent to your email</h3>
                                    {/*<i className={'fa-solid fa-circle-check'} style={ { color: '#00b894' } } />*/}
                                </div>
                            :   <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={`grid gap-7 mt-10 ${styles['inputs'] || ''}`}>
                                        <AuthInput type={'email'} errorMessage={errors.email?.message} isError={!!(errors.email?.message && touchedFields.email)}
                                                   register={register} name={'email'} placeholder={'E-mail'} value={email} setFocus={setFocus}
                                        />
                                    </div>
                                    <div className={`flex justify-between items-center mt-10 ${styles.submit}`}>
                                        <SubmitBtn isLoading={isLoading} value={'Submit'}/>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PassRecover)
