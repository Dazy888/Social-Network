import React, {useState} from "react"
// Navigation
import {useNavigate} from "react-router-dom"
// Components
import {ErrorMessages} from "../../login/components/ErrorMessages"
import {ErrorIcons} from "../../login/components/ErrorIcons"
import {LoginLoader} from "../../login/components/Loader"
// Form
import {Formik} from "formik"
// Axios
import {SettingsService} from "../../../services/SettingsService"
// Store
import {useSelector} from "react-redux"
import {getId} from "../../../store/reducers/profile/profile-selectors"

const loaderCss = {
    display: 'block',
    width: 'fit-content',
    margin: '30px auto'
}

export function ChangePass() {
    const navigate = useNavigate()
    const [passErr, changePassErr] = useState<string>('')
    const id = useSelector(getId)

    const validate = (pass: string, confirmPass: string, newPass: string) => {
        const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
        const errors: any = {}

        if (!pass) {
            errors.pass = 'Password is required'
        } else if (!passExp.test(pass) || /\s/.test(pass)) {
            errors.pass = 'Invalid password'
        }

        if (!newPass) {
            errors.newPass = 'Password is required'
        } else if (!passExp.test(newPass) || /\s/.test(newPass)) {
            errors.newPass = 'Invalid password'
        }

        if (confirmPass !== newPass) {
            errors.confirmPass = 'Passwords don’t match'
        }

        return errors
    }

    const submit = async (pass: string, confirmPass: string, newPass: string, setSubmitting: (status: boolean) => void) => {
        setSubmitting(true)
        const response = await SettingsService.changePass(pass, newPass, id)
        if (/Wrong/.test(response.data)) return changePassErr(response.data)

        navigate('/profile')
        setSubmitting(false)
    }

    return(
        <div className={'settings-form'}>
            <h3 className={'title'}>Change Password</h3>
            <hr/>
            <Formik validate={values => validate(values.pass, values.confirmPass, values.newPass)} initialValues={{confirmPass: '', pass: '', newPass: ''}} onSubmit={(values, {setSubmitting}) => submit(values.pass, values.confirmPass, values.newPass, setSubmitting)}>
                {({
                      errors,
                      touched,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      values
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={'error-container'}>
                            <ErrorMessages error={errors.pass} serverError={passErr} touched={touched.pass}/>
                            <input onClick={() => changePassErr('')} value={values.pass} onBlur={handleBlur} onChange={handleChange} className={`${errors.pass && touched.pass || passErr ? 'red-border big-input' : 'big-input'}`} name={'pass'} type={'password'} placeholder={'Current password'} minLength={4} maxLength={15}/>
                            <ErrorIcons error={errors.pass} serverError={passErr} touched={touched.pass}/>
                        </div>
                        <div className={'row flex-property-set_between'}>
                            <div className={'error-container'}>
                                <ErrorMessages error={errors.newPass} touched={touched.newPass}/>
                                <input value={values.newPass} onBlur={handleBlur} onChange={handleChange} className={`${errors.newPass && touched.newPass ? 'red-border' : ''}`} name={'newPass'} type={'password'} placeholder={'New password'} minLength={8} maxLength={15}/>
                                <ErrorIcons error={errors.newPass} touched={touched.newPass}/>
                            </div>
                            <div className={'error-container'}>
                                <ErrorMessages error={errors.confirmPass} touched={touched.confirmPass}/>
                                <input value={values.confirmPass} onBlur={handleBlur} onChange={handleChange} className={`${errors.confirmPass && touched.confirmPass ? 'red-border' : ''}`} name={'confirmPass'} type={'password'} placeholder={'Confirm password'} minLength={8} maxLength={15}/>
                                <ErrorIcons error={errors.confirmPass} touched={touched.confirmPass}/>
                            </div>
                        </div>
                        <button className={'submit'} type={'submit'} disabled={isSubmitting}>Change password</button>
                        <LoginLoader color={'rebeccapurple'} css={loaderCss} loading={isSubmitting}/>
                    </form>
                )}
            </Formik>
        </div>
    )
}