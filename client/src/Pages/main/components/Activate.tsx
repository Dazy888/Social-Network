import React from "react"
// Components
import {ErrorMessages} from "../../login/components/ErrorMessages"
import {ErrorIcons} from "../../login/components/ErrorIcons"
import {LoginLoader} from "../../login/components/Loader"
// Form
import {Formik} from "formik"
// Store
import {ActivateType, CancelActivation} from "../../login/types/login-types";
import {useSelector} from "react-redux";
import {getId} from "../../../store/reducers/profile/profile-selectors";
import {getEmail} from "../../../store/reducers/settings/settings-selectors";
import {cancelActivation} from "../../../store/reducers/settings/settings-reducer";
import {getActivatedStatus} from "../../../store/reducers/auth/auth-selectors";

const loaderCss = {
    display: 'block',
    width: 'fit-content',
    margin: '30px auto'
}

type PropsType = {
    cancelActivation: CancelActivation
    activate: ActivateType
}

export function Activate({activate, cancelActivation}: PropsType) {
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

    const submit = async (email: string, setSubmitting: (status: boolean) => void) => {
        setSubmitting(true)
        await activate(email, id)
        setSubmitting(false)
    }

    return(
        <div className={'settings-form'}>
            <h3 className={'title'}>Activate Email</h3>
            <hr/>
            <Formik validate={values => validate(values.email)} initialValues={{email: ''}} onSubmit={(values, {setSubmitting}) => submit(values.email, setSubmitting)}>
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
                        {isActivated ? <p className={'text'}>Your email is activated</p> : <button className={'submit'} type={'submit'} disabled={isSubmitting || !!email}>Activate</button>}
                        <LoginLoader color={'rebeccapurple'} css={loaderCss} loading={isSubmitting}/>
                    </form>
                )}
            </Formik>
            {isActivated ? null : <div>
                {!!email ? <p className={'text'}>The activation link was send on your email</p> : null}
                {!!email ? <button className={'cancel'} onClick={() => cancelActivation(id)}>Cancel</button> : null}
            </div>}
        </div>
    )
}