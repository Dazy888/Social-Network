import React, { useState } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
// Layouts
import { MainLayout } from "../../../layouts/Main-Layout"
import { SettingsLayout } from "../../../layouts/Settings-Layout"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
import { getEmail } from "../../../store/reducers/settings/settings-selectors"
import { getActivatedStatus } from "../../../store/reducers/auth/auth-selectors"
import { settingsActions } from "../../../store/reducers/settings/settings-reducer"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { SettingsService } from "../../../services/settings-service"
// Typification
import { IActivate, ActivateProps, CancelActivationProps } from "./interfaces/interfaces"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { Loader } from "../../authorization/components/Loader"
import { Input } from "../../authorization/components/Input"
// Styles
// @ts-ignore
import styles from "../../../styles/Settings.module.scss"
const Activate = () => {
    const dispatch = useDispatch()
    const [serverErr, changeServerErr] = useState<string>('')

    const id = useSelector(getId)
    const email = useSelector(getEmail)
    const isActivated = useSelector(getActivatedStatus)

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activate(data.email, data.id),
        {
            onSuccess(response) {
                dispatch(settingsActions.setEmail(response.data))
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

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IActivate>()
    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        await activate({email: data.email, id})
    }

    return(
        <MainLayout>
            <SettingsLayout>
                <Head>
                    <title>Email activation</title>
                </Head>
                <div className={`${styles['settings-form']} activate`}>
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
                    </form>
                    <div className={'email'}>
                        <Loader color={'rgb(102, 51, 153)'} loading={isLoading}/>
                    </div>
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
export default React.memo(Activate)