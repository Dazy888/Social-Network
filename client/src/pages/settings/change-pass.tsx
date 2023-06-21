import React from "react"
import { useAppSelector } from "@/hooks/redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { IChangePass, SetPassProps } from "@/models/settings.models"
import { SettingsService } from "@/services/settings.service"
import { useMutation } from "react-query"
import { notify } from "@/components/auth/AuthForm"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { Title } from "@/components/settings/Title"
import { SettingsPage } from "@/layouts/SettingsPageLayout"
import { ChangePassInput } from "@/components/settings/change-pass/ChangePassInput"
import { PassRequirements } from "@/components/common/PassRequirements"
import ScaleLoader from "react-spinners/ScaleLoader"

const ChangePass = () => {
    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync, isLoading } = useMutation('set pass', (data: SetPassProps) => SettingsService.changePassword(data.currentPass, data.newPass, data.id),
        {
            onSuccess() {
                notify('Password was successfully changed', 'success')
                reset()
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { register, handleSubmit, watch, reset, formState: { errors, touchedFields } } = useForm<IChangePass>({ mode: 'onChange' })
    const newPass = watch('newPass')

    const onSubmit: SubmitHandler<IChangePass> = async (data) => {
        if (isLoading) return notify('Too many requests, try later', 'warning')
        if (data.confirmPass !== data.newPass) return notify(`Passwords don't match`, 'warning')
        await mutateAsync({ currentPass: data.currentPass, newPass: data.newPass, id })
    }

    return(
        <SettingsPage title={'Password change'}>
            <Title title={'Password Change'}/>
            <hr className={'w-full h-px'}/>
            <form className={'py-10 px-6'} onSubmit={handleSubmit(onSubmit)}>
                <ChangePassInput className={styles['big-input']} errorMessage={errors.currentPass?.message} isError={!!(errors.currentPass?.message && touchedFields.currentPass)} register={register} name={'currentPass'}
                                 placeholder={'Current'}
                />
                <div className={`${styles['pass-inputs']} flex justify-between items-center mt-6`}>
                    <ChangePassInput errorMessage={errors.newPass?.message} isError={!!(errors.newPass?.message && touchedFields.newPass)} register={register} name={'newPass'}
                                     placeholder={'New'}
                    />
                    <ChangePassInput errorMessage={errors.confirmPass?.message} isError={!!(errors.confirmPass?.message && touchedFields.confirmPass)} register={register} name={'confirmPass'}
                                     placeholder={'Confirm'}
                    />
                </div>
                <PassRequirements isMinLength={newPass?.length > 7} isOneDigit={/\d/g.test(newPass)} isUppLetter={/[A-Z]/g.test(newPass)}
                                  isLowLetter={/[a-z]/g.test(newPass || '')} isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(newPass)}
                />
                <button className={`${styles.submit} w-full rounded-lg tracking-wider font-semibold text-white mt-5 py-4`} type={'submit'}>
                    {isLoading ?  <ScaleLoader color={'white'} loading={true} /> : 'Change password' }
                </button>
            </form>
        </SettingsPage>
    )
}

export default React.memo(ChangePass)
