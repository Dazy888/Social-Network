import React from "react"
import { useAppSelector } from "@/hooks/redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { ISetPass, SetPassProps } from "@/models/settings"
import { SettingsService } from "@/services/settings.service"
import { useMutation } from "react-query"
import { notify } from "@/pages/auth/sign-in"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/auth/Loader"
import { Title } from "@/components/settings/Title"
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"

const ChangePass = () => {
    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync, isLoading } = useMutation('set pass', (data: SetPassProps) => SettingsService.setPassword(data.currentPass, data.newPass, data.id),
        {
            onSuccess: (): any => notify('Password was successfully changed', 'success'),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ISetPass>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<ISetPass> = async (data) => {
        if (isLoading) notify('Too many requests, try later', 'warning')
        if (data.confirmPass !== data.newPass) notify(`Passwords don't match`, 'warning')
        await mutateAsync({ currentPass: data.currentPass, newPass: data.newPass, id })
    }

    return(
        <MainPage title={'Password change'}>
            <SettingsPage>
                <>
                    <Title title={'Change Password'}/>
                    <hr className={'w-full h-px'}/>
                    <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                        <Input errorName={'password'} type={'password'} className={styles['big-input']} error={errors.currentPass?.message} register={register}
                               touched={touchedFields.currentPass} name={'currentPass'} patternValue={passExp} minLength={4} maxLength={15} placeholder={'Current password'}
                        />
                        <div className={`${styles['pass-inputs']} flex justify-between items-center mt-6`}>
                            <Input errorName={'password'} type={'password'} error={errors.newPass?.message} touched={touchedFields.newPass} register={register}
                                   name={'newPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'New password'}
                            />
                            <Input errorName={'password'} type={'password'} error={errors.confirmPass?.message} touched={touchedFields.confirmPass} register={register}
                                   name={'confirmPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'Confirm password'}
                            />
                        </div>
                        <button className={`${styles.submit} w-full rounded-lg tracking-wider font-semibold text-white`} type={'submit'}>Change password</button>
                        <div className={styles.loader}>
                            <Loader color={'rebeccapurple'} loading={isLoading}/>
                        </div>
                    </form>
                </>
            </SettingsPage>
        </MainPage>
    )
}

export default React.memo(ChangePass)
