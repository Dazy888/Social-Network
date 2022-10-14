import React, {useRef, useState} from "react"
// CSS
import "../styles/Modal.css"
// Formik
import {Formik} from "formik"
// Components
import {ErrorMessages} from "../../login/components/ErrorMessages"
import {ErrorIcons} from "../../login/components/ErrorIcons"
import {ProfileLoader} from "../../main/components/Profile-Loader"
// Types
import {ChangeLocation, ChangeName, ChangePhoto} from "../types/Profile-Types"
// Store
import {connect, useSelector} from "react-redux"
import {getAvatar, getBanner, getId, getLocation, getName} from "../../../store/reducers/profile/profile-selectors"
import {compose} from "redux"
import {changeAvatar, changeBanner, changeLocation, changeName} from "../../../store/reducers/profile/profile-reducer"

type PropsType = {
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    setModalStatus: (status: boolean) => void
    changeName: ChangeName
    changeLocation: ChangeLocation
}

function ModalComponent({setModalStatus, changeName, changeLocation, changeAvatar, changeBanner}: PropsType) {
    const [nameError, setNameError] = useState<string>('')
    const btnRef: any = useRef()

    const id: any = useSelector(getId)
    const currentAvatar = useSelector(getAvatar)
    const currentBanner = useSelector(getBanner)
    const currentName = useSelector(getName)
    const currentLocation = useSelector(getLocation)

    async function submit(name: string, location: string, setSubmitting: (status: boolean) => void, banner: any, avatar: any) {
        function changeRequestStatus (status: boolean) {
            setSubmitting(status)
            btn.disabled = status
        }

        async function sendPhoto (photo: File, currentPhoto: string, changePhoto: (data: FormData) => void) {
            if (photo.name) {
                let data = new FormData()
                data.append('file', photo)
                data.append('id', id)
                data.append('currentPath', currentPhoto)
                await changePhoto(data)
            }
        }

        const btn = btnRef.current
        changeRequestStatus(true)

        if (name !== currentName) {
            const response = await changeName(name, id)
            if (response) {
                setNameError(response)
                changeRequestStatus(false)
            }
        }

        if (location !== currentLocation) await changeLocation(location, id)

        await sendPhoto(banner, currentBanner, changeBanner)
        await sendPhoto(avatar, currentAvatar, changeAvatar)

        changeRequestStatus(false)
        setModalStatus(false)
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
                            <button className={'cancel'} onClick={() => setModalStatus(false)}>Cancel</button>
                        </div>
                        {isSubmitting ? <ProfileLoader/> : null}
                    </form>
                )}
            </Formik>
        </div>
    )
}

export const Modal = compose<React.ComponentType>(connect(null, {changeName, changeLocation, changeAvatar, changeBanner}))(React.memo(ModalComponent))