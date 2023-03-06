import React, { useState } from "react"
import Head from "next/head"
import { useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Interfaces
import { ChangePassI, ChangePassPropsI } from "@/interfaces/settings-interfaces"
// HTTP Service
import { SettingsService } from "@/services/settings-service"
// React Query
import { useMutation } from "react-query"
// Store
import { getId } from "@/store/reducers/profile/profile-selectors"
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/authorization/Loader"
import { Message } from "@/components/settings/SuccessMessage"
// Styles
import styles from '@/styles/Settings.module.scss'
import {Title} from "@/components/settings/Title";

const ChangePass = () => {
    const [successMessage, changeSuccessMessage] = useState<string>('')
    const [confirmPassErr, changeConfirmPassErr] = useState<string>('')
    const [passErr, changePassErr] = useState<string>('')

    const id = useSelector(getId)

    const { mutateAsync, isLoading } = useMutation('change pass', (data: ChangePassPropsI) => SettingsService.changePass(data.pass, data.newPass, data.id),
        {
            onSuccess() {
                changeSuccessMessage('Password was successfully changed')
            },
            onError(err: string) {
                changePassErr(err)
            }
        }
    )

    const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ChangePassI>({mode: 'onChange'})

    const onSubmit: SubmitHandler<ChangePassI> = async (data) => {
        if (data.confirmPass !== data.newPass) changeConfirmPassErr(`Passwords don't match`)
        await mutateAsync({pass: data.pass, newPass: data.newPass, id})
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
                        <Input errorName={'password'} type={'password'} className={styles['big-input']} error={errors.pass?.message} touched={touchedFields.pass} serverError={passErr} register={register} name={'pass'} patternValue={passExp} minLength={4} maxLength={15} changeServerError={changePassErr} placeholder={'Current password'}/>
                        <div className={`${styles['pass-inputs']} flex justify-between items-center mt-6`}>
                            <Input errorName={'password'} type={'password'} error={errors.newPass?.message} touched={touchedFields.newPass} register={register} name={'newPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'New password'}/>
                            <Input errorName={'password'} changeServerError={changeConfirmPassErr} serverError={confirmPassErr} type={'password'} error={errors.confirmPass?.message} touched={touchedFields.confirmPass} register={register} name={'confirmPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'Confirm password'}/>
                        </div>
                        <button className={`${styles['submit']} w-full rounded-lg tracking-wider font-semibold`} type={'submit'} disabled={isLoading || !!successMessage}>Change password</button>
                        <div className={styles['loader']}>
                            <Loader color={'rebeccapurple'} loading={isLoading}/>
                        </div>
                        {successMessage && <Message message={successMessage}/>}
                    </form>
                </>
            </SettingsPage>
        </MainPage>
    )
}
export default React.memo(ChangePass)