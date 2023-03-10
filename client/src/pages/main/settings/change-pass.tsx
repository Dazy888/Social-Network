import React, { useState } from "react"
import Head from "next/head"
import { useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Interfaces
import { ISetPass, SetPassProps } from "@/interfaces/settings.interfaces"
// HTTP Service
import { SettingsService } from "@/services/settings.service"
// React Query
import { useMutation } from "react-query"
// Store
import { getUserId } from "@/store/reducers/profile/profile.selectors"
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/auth/Loader"
import { Message } from "@/components/settings/SuccessMessage"
import { Title } from "@/components/settings/Title"
// Styles
import styles from '@/styles/Settings.module.scss'

const ChangePass = () => {
    const [successMessage, setSuccessMessage] = useState('')
    const [confirmPassErr, setConfirmPassErr] = useState('')
    const [passErr, setPassErr] = useState('')

    const userId = useSelector(getUserId)

    const { mutateAsync, isLoading } = useMutation('set pass', (data: SetPassProps) => SettingsService.setPassword(data.currentPass, data.newPass, data.userId),
        {
            onSuccess() {
                setSuccessMessage('Password was successfully changed')
            },
            onError(err: string) {
                setPassErr(err)
            }
        }
    )

    const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ISetPass>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<ISetPass> = async (data) => {
        if (data.confirmPass !== data.newPass) setConfirmPassErr(`Passwords don't match`)

        await mutateAsync({ currentPass: data.currentPass, newPass: data.newPass, userId })
    }

    return(
        <MainPage>
            <SettingsPage>
                <Head>
                    <title>Changing password</title>
                </Head>
                <>
                    <Title title={'Change Password'}/>
                    <hr className={'w-full h-px'}/>
                    <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                        <Input errorName={'password'} type={'password'} className={styles['big-input']} error={errors.currentPass?.message} touched={touchedFields.currentPass} serverError={passErr} register={register} name={'currentPass'} patternValue={passExp} minLength={4} maxLength={15} setServerError={setPassErr} placeholder={'Current password'}/>
                        <div className={`${styles['pass-inputs']} flex justify-between items-center mt-6`}>
                            <Input errorName={'password'} type={'password'} error={errors.newPass?.message} touched={touchedFields.newPass} register={register} name={'newPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'New password'}/>
                            <Input errorName={'password'} setServerError={setConfirmPassErr} serverError={confirmPassErr} type={'password'} error={errors.confirmPass?.message} touched={touchedFields.confirmPass} register={register} name={'confirmPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'Confirm password'}/>
                        </div>
                        <button className={`${styles['submit']} w-full rounded-lg tracking-wider font-semibold text-white`} type={'submit'} disabled={isLoading || !!successMessage}>Change password</button>
                        <div className={styles['loader']}>
                            <Loader color={'rebeccapurple'} loading={isLoading}/>
                        </div>
                        { successMessage && <Message message={successMessage}/> }
                    </form>
                </>
            </SettingsPage>
        </MainPage>
    )
}

export default React.memo(ChangePass)
