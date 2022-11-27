import React from "react"
// Components
import { LoginLoader } from "../../login/components/Loader"
import { Input } from "../../login/components/Input"
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
import { SettingsService } from "../../../services/settings-service"
// Types
import { AxiosResponse } from "axios"
import { SettingsResponse } from "../../../models/response/settings-response"
import { ActivateInterface } from "../types/settings-types"
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form"

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

export default React.memo(function Email() {
    const dispatch = useDispatch()

    const id = useSelector(getId)
    const email = useSelector(getEmail)
    const isActivated = useSelector(getActivatedStatus)

    const { isLoading, mutateAsync:activate } = useMutation('activate email', (data: ActivateProps) => SettingsService.activate(data.email, data.id),
        {
            onSuccess(response: AxiosResponse<SettingsResponse>) {
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

    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ActivateInterface>()
    const onSubmit: SubmitHandler<ActivateInterface> = async (data) => {
        await activate({email: data.email, id})
    }

    return(
        <div className={'settings-form'}>
            <h3 className={'title'}>Activate Email</h3>
            <hr/>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!!email
                    ?   <div className={'activated-email'}>
                        <input className={'big-input'} disabled={true} value={email}/>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    :   <div className={'error-container'}>
                        <Input className={'big-input'} error={errors?.email?.message} touched={touchedFields.email} register={register} name={'email'} patternValue={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/} minLength={10} maxLength={20} placeholder={'Your email'}/>
                    </div>
                }
                {isActivated ? <p className={'text'}>Your email is activated</p> : <button className={'submit'} type={'submit'} disabled={isLoading || !!email}>Activate</button>}
                <LoginLoader color={'rgb(102, 51, 153)'} css={loaderCss} loading={isLoading}/>
            </form>
            {isActivated ? null :
            <div>
                {!!email ? <p className={'text'}>The activation link was send on your email</p> : null}
                {!!email ? <button className={'cancel'} onClick={() => cancelActivation({id})}>Cancel</button> : null}
            </div>}
        </div>
    )
})