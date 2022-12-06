import React, { useRef, useState } from "react"
// Components
import { InputFile } from "./Input-File"
// Types
import {ProfileInterface, TextProps} from "../types/profile-types"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Query
import { useMutation } from "react-query"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Store
import { getAvatar, getBanner, getId, getLocation, getName } from "../../../../store/reducers/profile/profile-selectors"
// Service
import { ProfileService } from "../../../../services/profile-service"
import { profileActions } from "../../../../store/reducers/profile/profile-reducer"
// Components
import { Input } from "../../../authorization/components/Input"
import { ProfileLoader } from "../../../../layouts/components/Profile-Loader"
// CSS
import styles from '../../../../styles/Profile.module.scss'

type PropsType = {
    setModalStatus: (status: boolean) => void
}

export default React.memo(function ModalComponent({ setModalStatus }: PropsType) {
    const dispatch = useDispatch()

    const [nameError, setNameError] = useState<string>('')
    const btnRef: any = useRef()

    const id: any = useSelector(getId)
    const currentAvatar = useSelector(getAvatar)
    const currentBanner = useSelector(getBanner)
    const currentName = useSelector(getName)
    const currentLocation = useSelector(getLocation)

    function successRequest(data: string, action: (text: string) => any) {
        dispatch(action(data))
        setModalStatus(false)
    }

    const { mutateAsync:changeName } = useMutation('change name', (data: TextProps) => ProfileService.changeName(data.text, data.id),
        {
            onSuccess(response) {
                successRequest(response.data, profileActions.setName)
            },
            onError(err: string) {
                setNameError(err)
            }
        }
    )

    const { mutateAsync:changeLocation } = useMutation('change location', (data: TextProps) => ProfileService.changeLocation(data.text, data.id),
        {
            onSuccess(response) {
                successRequest(response.data, profileActions.setLocation)
            }
        }
    )

    const { mutateAsync:changeBanner } = useMutation('change banner', (data: FormData) => ProfileService.changeBanner(data),
        {
            onSuccess(response) {
                successRequest(response.data, profileActions.setBanner)
            }
        }
    )

    const { mutateAsync:changeAvatar } = useMutation('change avatar', (data: FormData) => ProfileService.changeAvatar(data),
        {
            onSuccess(response) {
                successRequest(response.data, profileActions.setAvatar)
            }
        }
    )

    const { register, handleSubmit, setValue, formState: { errors, touchedFields, isSubmitting, isDirty }, watch } = useForm<ProfileInterface>({mode: 'onChange'})
    const watchBanner = watch('banner')
    const watchAvatar = watch('avatar')

    const onSubmit: SubmitHandler<ProfileInterface> = async (data) => {
        async function sendPhoto (photo: File, currentPhoto: string, changePhoto: (data: FormData) => void) {
            if (photo.name) {
                let data = new FormData()
                data.append('image', photo)
                data.append('id', id)
                data.append('currentPath', currentPhoto)
                await changePhoto(data)
            }
        }

        if (data.name !== currentName) await changeName({text: data.name, id})
        if (data.location !== currentLocation) await changeLocation({text: data.location, id})

        await sendPhoto(data.banner, currentBanner, changeBanner)
        await sendPhoto(data.avatar, currentAvatar, changeAvatar)

        setModalStatus(false)
    }

    return (
        <div className={styles['modal']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type={'text'} error={errors.name?.message} touched={touchedFields.name} serverError={nameError} register={register} name={'name'} patternValue={/^[a-zA-Z0-9]+$/} minLength={3} maxLength={10} changeServerError={setNameError} placeholder={'Your new name'}/>
                <Input type={'text'} error={errors.location?.message} touched={touchedFields.location} register={register} name={'location'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={15} changeServerError={setNameError} placeholder={'Your new location'}/>
                <div className={`${styles['files']} flex-between`}>
                    <div className={styles['box']}>
                        <InputFile label={'Banner'} name={'banner'} register={register} setValue={setValue} currentValue={watchBanner}/>
                        <InputFile label={'Avatar'} name={'avatar'} register={register} setValue={setValue} currentValue={watchAvatar}/>
                    </div>
                </div>
                <div className={`${styles['buttons']} flex-between`}>
                    <button ref={btnRef} className={styles['submit']} type="submit" disabled={!isDirty}>Submit</button>
                    <button className={styles['cancel']} onClick={() => {setModalStatus(false)}}>Cancel</button>
                </div>
                {isSubmitting ? <ProfileLoader/> : null}
            </form>
        </div>
    )
})