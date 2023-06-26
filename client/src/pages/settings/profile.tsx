import React, { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { notify } from "@/components/pages/auth/AuthForm"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { SettingsLayout } from "@/layouts/SettingsLayout"
import { FileInput } from "@/components/settings/FileInput"
import { Title } from "@/components/settings/Title"
import { ProfileInput } from "@/components/settings/profile/ProfileInput"
import ScaleLoader from "react-spinners/ScaleLoader"
// Models
import { ProfileSettings } from "@/models/settings.models"
// Store
import { setProfileSettings } from "@/store/reducers/ProfileSlice"

const Profile = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const [uploadedBanner, uploadBanner] = useState<File>()
    const [uploadedAvatar, uploadAvatar] = useState<File>()

    const currentName = useAppSelector(state => state.profileReducer.name)
    const currentLocation = useAppSelector(state => state.profileReducer.location)

    useEffect(() => {
        setValue('name', currentName)
        setValue('location', currentLocation)
    }, [currentName, currentLocation])

    const { mutateAsync, isLoading } = useMutation('set profile settings', (data: FormData) => SettingsService.setProfileSettings(data),
        {
            onSuccess(res) {
                notify('Profile was changed successfully', 'success')
                dispatch(setProfileSettings(res))
            },
            onError: (): any => notify('Something went wrong, reload page and try again', 'error')
        }
    )

    const {
        handleSubmit, register, setValue,
        formState: { errors, touchedFields, dirtyFields}, reset
    } = useForm<ProfileSettings>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<ProfileSettings> = async (data) => {
        if (isLoading) return notify('Your request is handling, try later', 'warning')
        if (Object.keys(dirtyFields).length === 0 && !uploadedAvatar && !uploadedBanner) return notify(`You didn't make any changes`, 'warning')

        const formData = new FormData()
        formData.append('id', id)
        if (data.name !== currentName) formData.append('name', data.name)
        if (data.location !== currentLocation) formData.append('location', data.location)
        if (uploadedBanner) formData.append('banner', uploadedBanner)
        if (uploadedAvatar) formData.append('avatar', uploadedAvatar)
        await mutateAsync(formData)
        reset({})
    }

    return(
        <SettingsLayout title={'Profile settings'}>
            <Title title={'Profile Settings'}/>
            <hr className={'w-full h-px'}/>
            <form className={`py-10 px-6 ${styles['profile-settings']}`} onSubmit={handleSubmit(onSubmit)}>
                <div className={'grid grid-cols-2 gap-10'}>
                    <ProfileInput pattern={/^[A-Za-z0-9-_]+$/} isError={!!(errors.name?.message && touchedFields.name)} register={register} name={'name'} />
                    <ProfileInput pattern={/^[A-Za-z0-9,\-\s]+$/} isError={!!(errors.location?.message && touchedFields.location)} register={register} name={'location'} />
                </div>
                <div className={'flex justify-center gap-10 mt-2'}>
                    <FileInput label={'Banner'} uploadedImage={uploadedBanner?.name} uploadImage={uploadBanner} />
                    <FileInput label={'Avatar'} uploadedImage={uploadedAvatar?.name} uploadImage={uploadAvatar} />
                </div>
                <button type={'submit'} className={`block text-smd font-semibold rounded-lg mx-auto py-4 px-10 text-white mt-10 ${styles.submit}`}>
                    {isLoading ? <ScaleLoader className={styles.loader} color={'white'} loading={true} /> : 'Submit' }
                </button>
            </form>
        </SettingsLayout>
    )
}

export default React.memo(Profile)
