import { useState } from "react"
import Head from "next/head"
// Layouts
import { SettingsLayout } from "../../../layouts/Settings-Layout"
import { MainLayout } from "../../../layouts/Main-Layout"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Types
import { ChangePassInterface, ChangePassProps } from "./types/settings-types"
// Service
import { SettingsService } from "../../../services/settings-service"
// React Query
import { useMutation } from "react-query"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
// Redux
import { useSelector } from "react-redux"
// Components
import { Input } from "../../authorization/components/Input"
import { LoginLoader } from "../../authorization/components/Loader"
import { SuccessMessage } from "./components/Success-Message"
// Styles
import styles from '../../../styles/Settings.module.scss'
export default function ChangePass() {
    const [successMessage, changeSuccessMessage] = useState<string>('')
    const [confirmPassErr, changeConfirmPassErr] = useState<string>('')
    const [passErr, changePassErr] = useState<string>('')

    const id = useSelector(getId)

    const { mutateAsync, isLoading } = useMutation('change pass', (data: ChangePassProps) => SettingsService.changePass(data.pass, data.newPass, data.id),
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
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ChangePassInterface>({mode: 'onChange'})

    const onSubmit: SubmitHandler<ChangePassInterface> = async (data) => {
        if (data.confirmPass !== data.newPass) changeConfirmPassErr(`Passwords don't match`)
        await mutateAsync({pass: data.pass, newPass: data.newPass, id})
    }

    return(
        <MainLayout>
            <SettingsLayout>
                <Head>
                    <title>Changing password</title>
                </Head>
                <div className={styles['settings-form']}>
                    <h3 className={styles['title']}>Change Password</h3>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input errorName={'password'} type={'password'} className={'big-input'} error={errors.pass?.message} touched={touchedFields.pass} serverError={passErr} register={register} name={'pass'} patternValue={passExp} minLength={4} maxLength={15} changeServerError={changePassErr} placeholder={'Current password'}/>
                        <div className={`${styles['row']} flex-between`}>
                            <Input errorName={'password'} type={'password'} error={errors.newPass?.message} touched={touchedFields.newPass} register={register} name={'newPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'New password'}/>
                            <Input errorName={'password'} changeServerError={changeConfirmPassErr} serverError={confirmPassErr} type={'password'} error={errors.confirmPass?.message} touched={touchedFields.confirmPass} register={register} name={'confirmPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'Confirm password'}/>
                        </div>
                        <button className={styles['submit']} type={'submit'} disabled={isLoading || !!successMessage}>Change password</button>
                        <LoginLoader color={'rebeccapurple'} loading={isLoading}/>
                        {successMessage ? <SuccessMessage message={successMessage}/> : null}
                    </form>
                </div>
            </SettingsLayout>
        </MainLayout>
    )
}