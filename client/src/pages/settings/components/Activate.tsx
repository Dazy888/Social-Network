import React from "react"
// Components
import { ErrorMessages } from "../../login/components/ErrorMessages"
import { ErrorIcons } from "../../login/components/ErrorIcons"
import { LoginLoader } from "../../login/components/Loader"
// Formik
import { Formik } from "formik"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
import { getEmail } from "../../../store/reducers/settings/settings-selectors"
import { getActivatedStatus } from "../../../store/reducers/auth/auth-selectors"
import { settingsActions } from "../../../store/reducers/settings/settings-reducer"
// React Query
import { useMutation } from "react-query"
// Service
import { SettingsService } from "../../../services/SettingsService"

const loaderCss = {
    display: "block",
    width: "fit-content",
    position: "relative",
    margin: "50px auto"
}

type ActivateProps = {
    email: string
    id: number
}

type CancelActivationProps = {
    id: number
}

export default React.memo(function ActivateComponent() {
    const dispatch = useDispatch()

    const id = useSelector(getId)
    const email = useSelector(getEmail)
    const isActivated = useSelector(getActivatedStatus)

    const validate = (email: string) => {
        const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const errors: any = {}

        if (!email) {
            errors.email = 'Email is required'
        } else if (!emailExp.test(email)) {
            errors.email = 'Invalid email'
        }

        return errors
    }

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activate(data.email, data.id),
        {
            onSuccess(response) {
                dispatch(settingsActions.setEmail(response.data.email))
            }
        }
    )

    const { mutateAsync:cancelActivation } = useMutation('cancel activation', (data: CancelActivationProps) => SettingsService.cancelActivation(data.id),
        {
            onSuccess() {
                dispatch(settingsActions.setEmail(''))
            }
        }
    )

    return(
        <div className={'settings-form'}>
            <h3 className={'title'}>Activate Email</h3>
            <hr/>
            <Formik validate={values => validate(values.email)} initialValues={{email: ''}} onSubmit={(values) => activate({email: values.email, id})}>
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
                        {!!email
                            ? <div className={'activated-email'}>
                                <input className={'big-input'} disabled={true} value={email}/>
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            : <div className={'error-container'}>
                                <ErrorMessages error={errors.email} touched={touched.email}/>
                                <input value={values.email} onBlur={handleBlur} onChange={handleChange} className={`${errors.email && touched.email ? 'red-border big-input' : 'big-input'}`} name={'email'} type={'email'} placeholder={'Your email'} minLength={10} maxLength={20}/>
                                <ErrorIcons error={errors.email} touched={touched.email}/>
                            </div>
                        }
                        {isActivated ? <p className={'text'}>Your email is activated</p> : <button className={'submit'} type={'submit'} disabled={isLoading || !!email}>Activate</button>}
                        <LoginLoader color={'rgb(102, 51, 153)'} css={loaderCss} loading={isLoading}/>
                    </form>
                )}
            </Formik>
            {isActivated ? null : <div>
            {!!email ? <p className={'text'}>The activation link was send on your email</p> : null}
            {!!email ? <button className={'cancel'} onClick={() => cancelActivation({id})}>Cancel</button> : null}
            </div>}
        </div>
    )
})