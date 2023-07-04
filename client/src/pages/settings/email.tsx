import React, { useState } from "react"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { IActivate, ActivateEmailParams } from "@/models/settings.models"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Styles
import styles from "@/styles/Settings.module.scss"
// Store
import { setEmail } from "@/store/reducers/SettingsSlice"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Components
import { SettingsLayout } from "@/layouts/SettingsLayout"
import { Title } from "@/components/pages/settings/Title"
import { ActivationMessage } from "@/components/pages/settings/email/ActivationMessage"
import { EmailInput } from "@/components/pages/settings/email/EmailInput"
import { Loader } from "@/components/pages/settings/Loader"
import { SubmitBtn } from "@/components/pages/settings/email/SubmitBtn"

const Email = () => {
    const dispatch = useAppDispatch()
    const [isFocus, setIsFocus] = useState(false)

    const id = useAppSelector(state => state.profileReducer.id)
    const email = useAppSelector(state => state.settingsReducer.email)
    const isActivated = useAppSelector(state => state.settingsReducer.isActivated)

    const { isLoading, mutateAsync:activate} = useMutation('activate email', (data: ActivateEmailParams) => SettingsService.activateMail(data.email, data.id),
        {
            onSuccess(res) {
                dispatch(setEmail(res))
                notify('Activation link was successfully sent on your e-mail', 'success')
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { register, handleSubmit, watch, setFocus, setValue } = useForm<IActivate>({ mode: 'onChange' })
    const inputValue = watch('email')

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        if (isLoading) return notify('Your request is handling', 'warning')
        await activate({ email: data.email, id })
    }

    const isInProcess = !isActivated && !!email

    return(
        <SettingsLayout title={'E-mail settings'}>
            <Title title={'E-mail Settings'}/>
            <hr className={'w-full h-px'}/>
            <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                <EmailInput isStatic={isActivated || isInProcess} focusedClassName={isFocus ? styles.focused : ''} value={inputValue || email} {...{ register, setFocus, isInProcess, setIsFocus }} />
                {!isActivated && <SubmitBtn loadingClassName={(isLoading || isInProcess) ? styles.loading : ''} disabled={isLoading || !!email} />}
                {isLoading && <Loader />}
            </form>
            {isInProcess && <ActivationMessage {...{ setIsFocus, setValue }} />}
        </SettingsLayout>
    )
}

export default React.memo(Email)
