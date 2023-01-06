import React, { useState } from "react"
import Head from "next/head"
// Layouts
import { MainLayout } from "../../../layouts/Main-Layout"
import { SettingsLayout } from "../../../layouts/Settings-Layout"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
import { getEmail } from "../../../store/reducers/settings/settings-selectors"
import { getActivatedStatus } from "../../../store/reducers/auth/auth-selectors"
import { settingsActions } from "../../../store/reducers/settings/settings-reducer"
// React Query
import { useMutation } from "react-query"
// Service
import { SettingsService } from "../../../services/settings-service"
// Typification
import { AxiosResponse } from "axios"
import { ActivateInterface, ActivateProps, CancelActivationProps } from "./types/settings-types"
import { SettingsResponses } from "../../../models/settings-responses"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { LoginLoader } from "../../authorization/components/Loader"
import { Input } from "../../authorization/components/Input"
// Styles
import styles from "../../../styles/Settings.module.scss"
export default function Activate() {
    const [serverErr, changeServerErr] = useState<string>('')

    const dispatch = useDispatch()

    const id = useSelector(getId)
    const email = useSelector(getEmail)
    const isActivated = useSelector(getActivatedStatus)

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activate(data.email, data.id),
        {
            onSuccess(response: AxiosResponse<SettingsResponses>) {
                dispatch(settingsActions.setEmail(response.data.email))
            },
            onError(error: string) {
                changeServerErr(error)
            }
        }
    )

    const { mutateAsync:cancelActivation } = useMutation('cancel activation', (data: CancelActivationProps) => SettingsService.cancelActivation(data.id),
        {
            onSuccess() {
                dispatch(settingsActions.setEmail(''))
            }
        }
    )

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ActivateInterface>()
    const onSubmit: SubmitHandler<ActivateInterface> = async (data) => {
        await activate({email: data.email, id})
    }

    return(
        <MainLayout>
            <SettingsLayout>
                <Head>
                    <title>Email activation</title>
                </Head>
                <div className={styles['settings-form']}>
                    <h3 className={styles['title']}>Activate Email</h3>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!!email
                            ?   <div className={styles['activated-email']}>
                                    <input className={'big-input'} disabled={true} value={email}/>
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                            :   <Input required={true} type={'text'} className={'big-input'} error={errors?.email?.message} touched={touchedFields.email} register={register} name={'email'} patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/} minLength={10} maxLength={20} placeholder={'Your email'} serverError={serverErr} changeServerError={changeServerErr}/>
                        }
                        {isActivated ? <p className={styles['text']}>Your email is activated</p> : <button className={styles['submit']} type={'submit'} disabled={isLoading || !!email}>Activate</button>}
                        <LoginLoader color={'rgb(102, 51, 153)'} loading={isLoading}/>
                    </form>
                    {isActivated ? null :
                        <div>
                            {!!email ? <p className={styles['text']}>The activation link was send on your email</p> : null}
                            {!!email ? <button className={styles['cancel']} onClick={() => cancelActivation({id})}>Cancel</button> : null}
                        </div>}
                </div>
            </SettingsLayout>
        </MainLayout>
    )
}