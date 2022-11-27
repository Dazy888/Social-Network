import React, { useState } from "react"
// Components
import { LoginLoader } from "../../login/components/Loader"
import { SuccessMessage } from "./SuccessMessage"
import { Input } from "../../login/components/Input"
// Service
import { SettingsService } from "../../../services/settings-service"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
// Redux
import { useSelector } from "react-redux"
// React Query
import { useMutation } from "react-query"
// React Hook Form
import { SubmitHandler, useForm } from "react-hook-form"
// Types
import { ChangePassInterface } from "../types/settings-types"

const loaderCss = {
    display: 'block',
    width: 'fit-content',
    margin: '30px auto'
}

type ChangePassProps = {
    pass: string
    newPass: string
    id: number
}

export function ChangePass() {
    const [successMessage, changeSuccessMessage] = useState<string>('')
    const [confirmPassErr, changeConfirmPassErr] = useState<string>('')
    const [passErr, changePassErr] = useState<string>('')
    const id = useSelector(getId)

    const { mutateAsync, isLoading } = useMutation('change pass', (data: ChangePassProps) => SettingsService.changePass(data.pass, data.newPass, data.id),
        {
            onSuccess() {
                changeSuccessMessage('Password was successfully changed')
            },
            onError(err: string) {
                changePassErr(err)
            }
        }
    )

    const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<ChangePassInterface>({mode: 'onChange'})

    const onSubmit: SubmitHandler<ChangePassInterface> = async (data) => {
        if (data.confirmPass !== data.newPass) changeConfirmPassErr(`Passwords don't match`)
        await mutateAsync({pass: data.pass, newPass: data.newPass, id})
    }

    return(
        <div className={'settings-form'}>
            <h3 className={'title'}>Change Password</h3>
            <hr/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type={'password'} className={'big-input'} error={errors.pass?.message} touched={touchedFields.pass} serverError={passErr} register={register} name={'pass'} patternValue={passExp} minLength={4} maxLength={15} changeServerError={changePassErr} placeholder={'Current password'}/>
                <div className={'row flex-property-set_between'}>
                    <Input type={'password'} error={errors.newPass?.message} touched={touchedFields.newPass} register={register} name={'newPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'New password'}/>
                    <Input changeServerError={changeConfirmPassErr} serverError={confirmPassErr} type={'password'} error={errors.confirmPass?.message} touched={touchedFields.confirmPass} register={register} name={'confirmPass'} patternValue={passExp} minLength={8} maxLength={15} placeholder={'Confirm password'}/>
                </div>
                <button className={'submit'} type={'submit'} disabled={isLoading || !!successMessage}>Change password</button>
                <LoginLoader color={'rebeccapurple'} css={loaderCss} loading={isLoading}/>
                {successMessage ? <SuccessMessage message={successMessage}/> : null}
            </form>
        </div>
    )
}