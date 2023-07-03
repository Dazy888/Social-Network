import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector}  from "@/hooks/redux"
import { useMutation } from "react-query"
import styles from "@/styles/Profile.module.scss"
import { ProfileInput } from "@/components/pages/profile/header-section/modal/ProfileInput"
import { ProfileService } from "@/services/profile.service"
import { SubmitHandler, useForm } from "react-hook-form"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Store
import { setProfileInfo } from "@/store/reducers/ProfileSlice"
// Models
import { ProfileInfo, SetProfileInfoProps } from "@/models/profile.models"

const ModalFormComponent = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const currentName = useAppSelector(state => state.profileReducer.name)
    const currentLocation = useAppSelector(state => state.profileReducer.location)

    useEffect(() => {
        setValue('name', currentName)
        setValue('location', currentLocation)
    }, [currentName, currentLocation])

    const { mutateAsync, isLoading } = useMutation('set profile info', (data: SetProfileInfoProps) => ProfileService.setProfileInfo(data),
        {
            onSuccess(res) {
                notify('Profile info was changed successfully', 'success')
                dispatch(setProfileInfo(res))
            },
            onError: (): any => notify('Something went wrong, reload page and try again', 'error')
        }
    )

    const { handleSubmit, register, setValue, reset,
        formState: { errors, touchedFields, dirtyFields},
    } = useForm<ProfileInfo>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<ProfileInfo> = async (data) => {
        if (isLoading) return notify('Your request is handling, try later', 'warning')
        if (Object.keys(dirtyFields).length === 0) return notify(`You didn't make any changes`, 'warning')

        await mutateAsync({ id, name: data.name, location: data.location })
        reset({})
    }

    return(
        <form className={`py-10 px-6 ${styles['profile-settings']}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={'grid gap-8'}>
                <ProfileInput pattern={/^[A-Za-z0-9-_]+$/} isError={!!(errors.name?.message && touchedFields.name)} register={register} name={'name'} />
                <ProfileInput pattern={/^[A-Za-z0-9,\-\s]+$/} isError={!!(errors.location?.message && touchedFields.location)} register={register} name={'location'} />
            </div>
            <button type={'submit'} className={`block text-smd font-medium rounded-lg mx-auto py-2.5 px-5 text-white mt-10 ${styles.submit}`}>Submit</button>
        </form>
    )
}

export const ModalForm = React.memo(ModalFormComponent)
