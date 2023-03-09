import React, { useState } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"
// Store
import { getUserId } from "@/store/reducers/profile/profile.selectors"
import { getEmail } from "@/store/reducers/settings/settings.selectors"
import { getActivatedStatus } from "@/store/reducers/auth/auth.selectors"
import { settingsActions } from "@/store/reducers/settings/settings.reducer"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { SettingsService } from "@/services/settings.service"
// Interfaces
import { IActivate, ActivateProps, CancelActivationProps } from "@/interfaces/settings.interfaces"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { Loader } from "@/components/auth/Loader"
import { Input } from "@/components/common/Input"
import { Title } from "@/components/settings/Title"
// Styles
import styles from "@/styles/Settings.module.scss"

const Activate = () => {
    const dispatch = useDispatch()
    const [serverErr, setServerErr] = useState('')

    const userId = useSelector(getUserId)
    const email = useSelector(getEmail)
    const isActivated = useSelector(getActivatedStatus)

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activateMail(data.email, data.userId),
        {
            onSuccess(res) {
                dispatch(settingsActions.setEmail(res.data))
            },
            onError(error: string) {
                setServerErr(error)
            }
        }
    )

    const { mutateAsync:cancelActivation } = useMutation('cancel activation', (data: CancelActivationProps) => SettingsService.cancelActivation(data.userId),
        {
            onSuccess() {
                dispatch(settingsActions.setEmail(''))
            }
        }
    )

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IActivate>()

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        await activate({email: data.email, userId})
    }

    return(
        <MainPage>
            <SettingsPage>
                <Head>
                    <title>Email activation</title>
                </Head>
                <>
                    <Title title={'Activate Email'}/>
                    <hr className={'w-full h-px'}/>
                    <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                        {!!email
                            ?   <div className={styles['activated-email']}>
                                    <input className={styles['big-input']} disabled={true} value={email}/>
                                    <i className={'absolute fa-solid fa-circle-check'}/>
                                </div>
                            :   <Input required={true} type={'text'} className={styles['big-input']} error={errors?.email?.message} touched={touchedFields.email} register={register} name={'email'} patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/} minLength={10} maxLength={20} placeholder={'Your email'} serverError={serverErr} setServerError={setServerErr}/>
                        }
                        {isActivated ? <p className={'text-lg font-medium text-center'}>Your email is activated</p> : <button className={`${styles['submit']} w-full rounded-lg tracking-wider font-semibold`} type={'submit'} disabled={isLoading || !!email}>Activate</button>}
                    </form>
                    <div className={styles['loader']}>
                        <Loader color={'rgb(102, 51, 153)'} loading={isLoading}/>
                    </div>
                    {(!isActivated && !!email) &&
                        <div>
                            <p className={`${styles['activation-text']} text-lg font-medium text-center`}>The activation link was sent on your e-mail</p>
                            <button className={`${styles['cancel']} rounded-2xl text-lg font-medium duration-300 my-7 mx-auto block`} onClick={() => cancelActivation({ userId })}>Cancel</button>
                        </div>
                    }
                </>
            </SettingsPage>
        </MainPage>
    )
}

export default React.memo(Activate)
