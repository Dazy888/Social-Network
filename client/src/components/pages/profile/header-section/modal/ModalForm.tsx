import React, { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector }  from "@/hooks/redux"
import { useMutation } from "react-query"
import { SubmitHandler, useForm } from "react-hook-form"
// Styles
import styles from "@/styles/Profile.module.scss"
// Service
import { ProfileService } from "@/services/profile.service"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Store
import { setProfileInfo } from "@/store/reducers/ProfileSlice"
// Models
import { ProfileInfo, SetProfileInfoProps } from "@/models/profile.models"
// Components
import Autocomplete from "react-google-autocomplete"
import { ProfileInput } from "@/components/pages/profile/header-section/modal/ProfileInput"
import { ClipLoader } from "react-spinners"

const ModalFormComponent = () => {
    const dispatch = useAppDispatch()

    const placeRef: any = useRef()

    const id = useAppSelector(state => state.profileReducer.id)
    const currentName = useAppSelector(state => state.profileReducer.profile.name)
    const currentLocation = useAppSelector(state => state.profileReducer.profile.location)

    useEffect(() => {
        setValue('name', currentName || '')
        placeRef.current?.setAttribute('value', currentLocation || '')
    }, [currentName, currentLocation])

    const { mutateAsync, isLoading } = useMutation('set profile info', (data: SetProfileInfoProps) => ProfileService.updateProfile(data, data.id),
        {
            onSuccess: (res) => {
                const data = {
                    name: getValues('name'),
                    location: placeRef.current?.value
                }

                dispatch(setProfileInfo(data))
                notify('Profile info successfully', 'success')
            },
            onError: (): any => notify('Something went wrong, reload page and try again', 'error')
        }
    )

    const {
        handleSubmit, register, setValue, reset,
        formState: { errors, touchedFields}, getValues
    } = useForm<ProfileInfo>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<ProfileInfo> = async (data) => {
        await mutateAsync({
            id,
            name: data.name,
            location: placeRef.current?.value
        })

        reset({})
    }

    return(
        <form className={`py-10 px-6 ${styles['profile-settings']}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={'grid gap-8'}>
                <ProfileInput pattern={/^[A-Za-z0-9-_]+$/} isError={!!(errors.name?.message && touchedFields.name)} register={register} name={'name'} />
                <Autocomplete apiKey={'AIzaSyDCP084TfkesJzl_npzhGXErK3nwXCVWSE'} className={'rounded-lg pl-3 py-2'} ref={placeRef as any} />
            </div>
            <button className={`block text-smd font-medium rounded-lg mx-auto py-2.5 px-5 text-white mt-10 ${styles.submit}`} type={'submit'}
                    disabled={isLoading}
            >
                { isLoading ? <ClipLoader color={'#FFFF'} size={13} /> : 'Submit' }
            </button>
        </form>
    )
}

export const ModalForm = React.memo(ModalFormComponent)
