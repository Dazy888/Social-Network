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
import { CancelActivation } from "@/components/pages/settings/email/CancelActivation"
import { EmailInput } from "@/components/pages/settings/email/EmailInput"
import { Loader } from "@/components/pages/settings/Loader"
import { SubmitBtn } from "@/components/pages/settings/email/SubmitBtn"

const Email = () => {
    const dispatch = useAppDispatch()
    const [isFocus, setIsFocus] = useState(false)

    const userId = useAppSelector(state => state.profileReducer.id)
    const email = useAppSelector(state => state.settingsReducer.email)
    const activatedEmail = useAppSelector(state => state.settingsReducer.activatedEmail)

    const { isLoading, mutateAsync:activate} = useMutation('activate email', (data: ActivateEmailParams) => SettingsService.activateMail(data),
        {
            onSuccess(res) {
                dispatch(setEmail(res))
                notify('Activation link successfully sent on your e-mail', 'success')
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { register, handleSubmit, watch, setFocus, setValue } = useForm<IActivate>({ mode: 'onChange' })
    const inputValue = watch('email')

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        if (isLoading) return notify('Your request is handling', 'warning')
        await activate({ email: data.email, userId })
    }

    const isInProcess = !activatedEmail && !!email

    return(
        <SettingsLayout title={'E-mail settings'}>
            <Title title={'E-mail Settings'}/>
            <hr className={'w-full h-px'}/>
            <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                <EmailInput isStatic={activatedEmail || isInProcess} focusedClassName={isFocus ? styles.focused : ''} value={inputValue || email}
                            {...{ register, setFocus, isInProcess, setIsFocus }}
                />
                { !activatedEmail && <SubmitBtn loadingClassName={(isLoading || isInProcess) ? styles.loading : ''} disabled={isLoading || !!email} /> }
                { isLoading && <Loader /> }
            </form>
            {isInProcess && <CancelActivation {...{ setIsFocus, setValue }} />}
        </SettingsLayout>
    )
}

export default React.memo(Email)
