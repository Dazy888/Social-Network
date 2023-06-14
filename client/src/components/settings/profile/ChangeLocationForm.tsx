import React from "react"
import styles from "@/styles/Settings.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
// Models
import { ILocationForm } from "@/models/settings"
import { TextProps } from "@/models/profile"
// Store
import { setUserLocation } from "@/store/reducers/ProfileSlice"
// Alert
import { notify } from "@/components/auth/AuthForm"
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
// Components
import { SubmitBtn } from "@/components/settings/SubmitBtn"
import { Input } from "@/components/common/Input"

const ChangeLocationFormComponent = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const currentLocation = useAppSelector(state => state.profileReducer.location)

    const { register:locationReg, handleSubmit:locationSub, formState: { errors:locationErr, touchedFields:locationTouched } } = useForm<ILocationForm>({ mode: 'onChange' })

    const { mutateAsync:setLocation, isLoading:isSettingLocation } = useMutation('set location', (data: TextProps) => SettingsService.setLocation(data.text, data.id),
        {
            onSuccess(res) {
                dispatch(setUserLocation(res))
                notify('Your location was successfully changed', 'success')
            },
            onError: (): any => notify('Your location was not change, try again', 'error')
        }
    )

    const locationSubmit: SubmitHandler<ILocationForm> = async (data) => (data.location !== currentLocation) && await setLocation({ text: data.location, id })

    return(
        <form onSubmit={locationSub(locationSubmit)} className={styles['input-container']}>
            <Input type={'text'} error={!(locationErr.location?.message && locationTouched.location)} register={locationReg} name={'location'}
                   patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={15} placeholder={'Your new location'}
            />
            <SubmitBtn isLoading={isSettingLocation}/>
        </form>
    )
}

export const ChangeLocationForm = React.memo(ChangeLocationFormComponent)
