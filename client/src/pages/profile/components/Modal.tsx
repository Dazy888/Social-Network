import React, { useRef, useState } from "react"
// CSS
import "../styles/modal.css"
// Formik
import { Formik } from "formik"
// Components
import { ErrorMessages } from "../../login/components/ErrorMessages"
import { ErrorIcons } from "../../login/components/ErrorIcons"
import { ProfileLoader } from "../../main/components/Profile-Loader"
// Types
import { TextProps } from "../types/profile-types"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Store
import { getAvatar, getBanner, getId, getLocation, getName } from "../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
// React Query
import { useMutation } from "react-query"
// Service
import { ProfileService } from "../../../services/profile-service"

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

    const { mutateAsync:changeName } = useMutation('change name', (data: TextProps) => ProfileService.changeName(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.setName(response.data))
            },
            onError(err: string) {
                setNameError(err)
            }
        }
    )

    const { mutateAsync:changeLocation } = useMutation('change location', (data: TextProps) => ProfileService.changeLocation(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.setLocation(response.data))
            }
        }
    )

    const { mutateAsync:changeBanner } = useMutation('change banner', (data: FormData) => ProfileService.changeBanner(data),
        {
            onSuccess(response) {
                dispatch(profileActions.setBanner(response.data))
            }
        }
    )

    const { mutateAsync:changeAvatar } = useMutation('change avatar', (data: FormData) => ProfileService.changeAvatar(data),
        {
            onSuccess(response) {
                dispatch(profileActions.setAvatar(response.data))
            }
        }
    )

    async function submit(name: string, location: string, setSubmitting: (status: boolean) => void, banner: any, avatar: any) {
        function changeRequestStatus (status: boolean) {
            setSubmitting(status)
            btn.disabled = status
        }

        async function sendPhoto (photo: File, currentPhoto: string, changePhoto: (data: FormData) => void) {
            if (photo.name) {
                let data = new FormData()
                data.append('image', photo)
                data.append('id', id)
                data.append('currentPath', currentPhoto)
                await changePhoto(data)
            }
        }

        const btn = btnRef.current
        changeRequestStatus(true)

        if (name !== currentName) await changeName({text: name, id})
        if (location !== currentLocation) await changeLocation({text: location, id})

        await sendPhoto(banner, currentBanner, changeBanner)
        await sendPhoto(avatar, currentAvatar, changeAvatar)

        changeRequestStatus(false)
    }

    function validate(name: string, location: string) {
        const userNameExp = /[a-zA-Z0-9]+/
        let errors: any = {}

        if (!name) {
            errors.name = 'Name is required'
        } else if (!userNameExp.test(name) || /\s/.test(name)) {
            errors.name = 'Invalid name'
        }

        if (!location) {
            errors.location = 'Location is required'
        } else if (!userNameExp.test(location)) {
            errors.location = 'Invalid location'
        }

        return errors
    }

    return (
        <div className="modal">
            <Formik validate={values => validate(values.name, values.location)} initialValues={{name: currentName, location: currentLocation, banner: {name: ''}, avatar: {name: ''}}} onSubmit={(values, {setSubmitting}) => submit(values.name, values.location, setSubmitting, values.banner, values.avatar)}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={'error-container'}>
                            <ErrorMessages error={errors.name} serverError={nameError} touched={touched.name}/>
                            <input onClick={() => setNameError('')} type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder={'Your new name'} minLength={3} maxLength={10}/>
                            <ErrorIcons error={errors.name} serverError={nameError} touched={touched.name}/>
                        </div>
                        <div className={'error-container'}>
                            <ErrorMessages error={errors.location} touched={touched.location}/>
                            <input type="text" name="location" onChange={handleChange} onBlur={handleBlur} value={values.location} placeholder={'Your new location'} minLength={4} maxLength={15}/>
                            <ErrorIcons error={errors.location} touched={touched.location}/>
                        </div>
                        <div className={'files flex-property-set_between'}>
                            <div className={'box'}>
                                <label>Banner</label>
                                <input type="file" name="banner" onChange={(event: any) => {setFieldValue('banner', event.currentTarget.files[0])}} />
                                <div className={'circle flex-property-set_center'}>
                                    <i className="fa-solid fa-upload"></i>
                                </div>
                                <span className={'photo-name'}>
                                    {values.banner.name}
                                </span>
                            </div>
                            <div className={'box'}>
                                <label>Avatar</label>
                                <input type="file" name="avatar" onChange={(event: any) => {setFieldValue('avatar', event.currentTarget.files[0])}} />
                                <div className={'circle flex-property-set_center'}>
                                    <i className="fa-solid fa-upload"></i>
                                </div>
                                <span className={'photo-name'}>
                                    {values.avatar.name}
                                </span>
                            </div>
                        </div>
                        <div className={'buttons flex-property-set_between'}>
                            <button ref={btnRef} className={'submit'} type="submit" disabled={(values.name === currentName && values.location === currentLocation && !values.banner.name && !values.avatar.name)}>Submit</button>
                            <button className={'cancel'} onClick={() => {setModalStatus(false)}}>Cancel</button>
                        </div>
                        {isSubmitting ? <ProfileLoader/> : null}
                    </form>
                )}
            </Formik>
        </div>
    )
})