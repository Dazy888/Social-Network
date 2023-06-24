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
import { SettingsLayout } from "@/layouts/SettingsLayout"
import { Title } from "@/components/settings/Title"
import { ActivatedEmail } from "@/components/settings/activation/ActivatedEmail"
import { ActivationMessage } from "@/components/settings/activation/ActivationMessage"
import ScaleLoader from "react-spinners/ScaleLoader"

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

    const { register, handleSubmit, formState: { } } = useForm<IActivate>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        if (isLoading) return notify('Your request is handling', 'warning')
        await activate({ email: data.email, id })
    }

    return(
        <SettingsLayout title={'E-mail activation'}>
            <Title title={'E-mail Activation'}/>
            <hr className={'w-full h-px'}/>
            <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                {!!email
                    ?   <ActivatedEmail email={email} />
                    :   <input required minLength={5} maxLength={35} className={`${styles['big-input']} ${styles.input}`} type={'email'} placeholder={'Your e-mail'} {...(register('email'))} />
                }
                {!isActivated &&
                    <button className={`${styles.submit} w-full rounded-lg tracking-wider font-semibold text-white py-4`} type={'submit'} disabled={isLoading || !!email}>
                        { isLoading ? <ScaleLoader color={'rgb(255, 255, 255)'} loading={true} /> : 'Activate' }
                    </button>
                }
            </form>
            {(!isActivated && !!email) && <ActivationMessage />}
        </SettingsLayout>
    )
}

export default React.memo(Activate)
