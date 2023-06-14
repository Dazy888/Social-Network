import React from "react"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { IActivate, ActivateProps } from "@/models/settings"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notify} from "@/pages/auth/sign-in"
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
import { MainPage } from "@/layouts/MainPageLayout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"

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
            onError: (): any => notify('Something went wrong, try again', 'error')
        }
    )

    const { mutateAsync:cancelActivation } = useMutation('cancel activation', (data: Pick<ActivateProps, 'id'>) => SettingsService.cancelActivation(data.id),
        {
            onSuccess() {
                dispatch(setEmail(''))
                notify('Activation was canceled successfully', 'success')
            },
            onError: (): any => notify('Cancellation has failed', 'error')
        }
    )

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IActivate>()

    const onSubmit: SubmitHandler<IActivate> = async (data) => {
        await activate({ email: data.email, id })
    }

    return(
        <MainPage title={'E-mail activation'}>
            <SettingsPage>
                <>
                    <Title title={'Activate Email'}/>
                    <hr className={'w-full h-px'}/>
                    <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                        {!!email
                            ?   <div className={styles['activated-email']}>
                                    <input className={styles['big-input']} disabled={true} value={email}/>
                                    <i className={'absolute fa-solid fa-circle-check'}/>
                                </div>
                            :   <Input required={true} type={'text'} className={styles['big-input']} error={errors?.email?.message} touched={touchedFields.email} register={register}
                                       name={'email'} patternValue={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/} minLength={10} maxLength={20} placeholder={'Your email'}
                                />
                        }
                        {isActivated
                            ? <p className={'text-lg font-medium text-center'}>Your email is activated</p>
                            : <button className={`${styles.submit} w-full rounded-lg tracking-wider font-semibold`} type={'submit'} disabled={isLoading || !!email}>Activate</button>}
                    </form>
                    <div className={styles.loader}>
                        <Loader color={'rgb(102, 51, 153)'} loading={isLoading}/>
                    </div>
                    {(!isActivated && !!email) &&
                        <div>
                            <p className={`${styles['activation-text']} text-lg font-medium text-center`}>The activation link was sent on your e-mail</p>
                            <button className={`${styles.cancel} rounded-2xl text-lg font-medium duration-300 my-7 mx-auto block text-white`} onClick={() => cancelActivation({ id })}>Cancel</button>
                        </div>
                    }
                </>
            </SettingsPage>
        </MainPage>
    )
}

export default React.memo(Activate)
