import React, {useEffect, useState} from "react"
// CSS
import "../styles/Modal.css"
// Formik
import {Formik} from "formik"
// Components
import {ErrorMessages} from "../../login/components/ErrorMessages"
import {ErrorIcons} from "../../login/components/ErrorIcons"
// Types
import {ChangeLocation, ChangeName, ChangePhoto} from "../../login/types/login-types"
import {ProfileLoader} from "./Profile-Loader"

type PropsType = {
    id: any
    currentName: string
    currentLocation: string
    currentBanner: string
    currentAvatar: string
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    setModalStatus: (status: boolean) => void
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export function Modal({setModalStatus, currentName, currentLocation, changeName, changeLocation, changeAvatar, changeBanner, currentBanner, currentAvatar, id}: PropsType) {
    const [nameError, setNameError] = useState<string>('')

    useEffect(() => {
        const input: any = document.querySelector('input[name=name]')
        input.onclick = () => setNameError('')
    }, [])

    async function submit(name: string, location: string, setSubmitting: (status: boolean) => void, banner: any, avatar: any) {
        let response
        const btn: any = document.querySelector('button[type=submit]')
        setSubmitting(true)
        btn.disabled = true

        if (name !== currentName) response = await changeName(name, id)
        if (response) {
            setNameError(response)
            setSubmitting(false)
            btn.disabled = false
            return
        }
        if (location !== currentLocation) await changeLocation(location, id)

        if (banner.name) {
            let data = new FormData()
            data.append('file', banner)
            data.append('id', id)
            data.append('currentPath', currentBanner)
            await changeBanner(data)
        }

        if (avatar.name) {
            let data = new FormData()
            data.append('file', avatar)
            data.append('id', id)
            data.append('currentPath', currentAvatar)
            await changeAvatar(data)
        }

        setSubmitting(false)
        btn.disabled = false
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
                            <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder={'Your new name'} minLength={3} maxLength={10}/>
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
                            <button className={'submit'} type="submit" disabled={(values.name === currentName && values.location === currentLocation && !values.banner.name && !values.avatar.name)}>Submit</button>
                            <button className={'cancel'} onClick={() => setModalStatus(false)}>Cancel</button>
                        </div>
                        {isSubmitting ? <ProfileLoader/> : null}
                    </form>
                )}
            </Formik>
        </div>
    )
}