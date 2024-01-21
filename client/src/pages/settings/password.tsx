import React from "react"
import { useAppSelector } from "@/hooks/redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { IChangePass, ChangePassParams } from "@/models/settings.models"
import { SettingsService } from "@/services/settings.service"
import { useMutation } from "react-query"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { SettingsLayout } from "@/layouts/SettingsLayout"
import { Title } from "@/components/pages/settings/Title"
import { ChangePassInput } from "@/components/pages/settings/password/ChangePassInput"
import { PassRequirements } from "@/components/common/PassRequirements"
import { Loader } from "@/components/pages/settings/Loader"

const Password = () => {
    const userId = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync, isLoading, isSuccess } = useMutation('set pass', (data: ChangePassParams) => SettingsService.changePass(data),
        {
            onSuccess() {
                notify('Password changed successfully', 'success')
                reset()
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { register, handleSubmit, watch, setFocus, reset,
        formState: { errors, touchedFields
    }} = useForm<IChangePass>({ mode: 'onChange' })

    const currentPass = watch('currentPass')
    const newPass = watch('newPass')
    const confirmPass = watch('confirmPass')

    const onSubmit: SubmitHandler<IChangePass> = async (data) => {
        if (isLoading) return notify('Too many requests, try later', 'warning')
        if (data.confirmPass !== data.newPass) return notify(`Passwords don't match`, 'warning')
        await mutateAsync({
            currentPass: data.currentPass,
            newPass: data.newPass,
            userId
        })
    }

    return(
        <SettingsLayout title={'Password settings'}>
            <Title title={'Password Settings'}/>
            <hr className={'w-full h-px'}/>
            <form className={`py-10 px-6 ${styles['settings-form']}`} onSubmit={handleSubmit(onSubmit)}>
                <ChangePassInput isSuccess={isSuccess} errorMessage={errors.currentPass?.message} isError={!!(errors.currentPass?.message && touchedFields.currentPass)} register={register} name={'currentPass'}
                                 placeholder={'Current'} setFocus={setFocus} value={currentPass}
                />
                <div className={`${styles['pass-inputs']} grid grid-cols-2 gap-10 mt-6`}>
                    <ChangePassInput isSuccess={isSuccess} errorMessage={errors.newPass?.message} isError={!!(errors.newPass?.message && touchedFields.newPass)} register={register} name={'newPass'}
                                     placeholder={'New'} setFocus={setFocus} value={newPass}
                    />
                    <ChangePassInput isSuccess={isSuccess} errorMessage={errors.confirmPass?.message} isError={!!(errors.confirmPass?.message && touchedFields.confirmPass)} register={register} name={'confirmPass'}
                                     placeholder={'Confirm'} setFocus={setFocus} value={confirmPass}
                    />
                </div>
                <PassRequirements isMinLength={newPass?.length > 7} isOneDigit={/\d/g.test(newPass)} isUppLetter={/[A-Z]/g.test(newPass)} className={styles['pass-requirement']}
                                  isLowLetter={/[a-z]/g.test(newPass || '')} isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(newPass)}
                />
                <button disabled={isLoading} className={`${styles.submit} ${isLoading ? styles.loading : ''} w-full rounded-lg tracking-wide font-medium text-white mt-5 py-4`} type={'submit'}>Change password</button>
                {isLoading && <Loader />}
            </form>
        </SettingsLayout>
    )
}

export default React.memo(Password)
