import React, {useEffect} from "react"
import "./Modal.css"
import {Formik} from "formik"

type PropsType = {
    setModelStatus: (status: boolean) => void
}

export function Modal({setModelStatus}: PropsType) {
    function submit(values: any) {

    }

    function validate(values: any) {

    }

    return (
        <div className="modal">
            <Formik validate={values => validate(values)} initialValues={{name: '', location: '', banner: '', avatar: ''}} onSubmit={(values, {setSubmitting}) => submit(values)}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder={'Your new name'}/>
                        <input type="text" name="location" onChange={handleChange} onBlur={handleBlur} value={values.location} placeholder={'Your new location'}/>
                        <div className={'files flex-property-set_between'}>
                            <div className={'box'}>
                                <label>Banner</label>
                                <input type="file" name="banner" onChange={handleChange} onBlur={handleBlur} value={values.banner} />
                                <div className={'circle flex-property-set_center'}>
                                    <i className="fa-solid fa-upload"></i>
                                </div>
                                <span className={'photo-name'}>
                                    {values.banner.split('\\')[2]}
                                </span>
                            </div>
                            <div className={'box'}>
                                <label>Avatar</label>
                                <input type="file" name="avatar" onChange={handleChange} onBlur={handleBlur} value={values.avatar} />
                                <div className={'circle flex-property-set_center'}>
                                    <i className="fa-solid fa-upload"></i>
                                </div>
                                <span className={'photo-name'}>
                                    {values.avatar.split('\\')[2]}
                                </span>
                            </div>
                        </div>
                        <div className={'buttons flex-property-set_between'}>
                            <button className={'submit'} type="submit" disabled={isSubmitting}>Submit</button>
                            <button className={'cancel'} onClick={() => setModelStatus(false)}>Cancel</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}