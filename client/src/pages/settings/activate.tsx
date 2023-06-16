import React from "react"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { IActivate, ActivateProps } from "@/models/settings.models"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notify } from "@/components/auth/AuthForm"
// Styles
import styles from "@/styles/Settings.module.scss"
// Store
import { setEmail } from "@/store/reducers/SettingsSlice"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { Loader } from "@/components/auth/Loader"
import { Input } from "@/components/common/Input"
import { Title } from "@/components/settings/Title"
import { SettingsPage } from "@/layouts/SettingsPageLayout"
import { ActivatedEmail } from "@/components/settings/activation/ActivatedEmail"
import { ActivationMessage } from "@/components/settings/activation/ActivationMessage"

const Activate = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const email = useAppSelector(state => state.settingsReducer.email)
    const isActivated = useAppSelector(state => state.settingsReducer.isActivated)

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activateMail(data.email, data.id),
        {
            onSuccess(res) {
                dispatch(setEmail(res))
                notify('Activation link was successfully sent on your e-mail', 'success')
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IActivate>()

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        if (isLoading) return notify('Too many requests, try again later', 'warning')
        await activate({ email: data.email, id })
    }

    return(
        <SettingsPage title={'E-mail activation'}>
            <Title title={'E-mail Activation'}/>
            <hr className={'w-full h-px'}/>
            <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                {/*{!!email*/}
                {/*    ?   <ActivatedEmail email={email} />*/}
                {/*    :   <Input required={true} type={'text'} className={styles['big-input']} error={!(errors?.email?.message && touchedFields.email)} register={register}*/}
                {/*               name={'email'} patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/} minLength={10} maxLength={20} placeholder={'Your email'}*/}
                {/*    />*/}
                {/*}*/}
                {isActivated
                    ?   <p className={'text-lg font-medium text-center'}>Your email is activated</p>
                    :   <button className={`${styles.submit} w-full rounded-lg tracking-wider font-semibold`} type={'submit'} disabled={isLoading || !!email}>
                        { isLoading ? <Loader color={'rgb(102, 51, 153)'} loading={isLoading}/> : 'Activate' }
                    </button>
                }
            </form>
            {(!isActivated && !!email) && <ActivationMessage />}
        </SettingsPage>
    )
}

export default React.memo(Activate)
