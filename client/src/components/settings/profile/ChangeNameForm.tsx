import React from "react"
import styles from "@/styles/Settings.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
// Models
import { INameForm } from "@/models/settings"
import { TextProps } from "@/models/profile"
// Store
import { setUserName } from "@/store/reducers/ProfileSlice"
// Alert
import { notify } from "@/components/auth/AuthForm"
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
// Components
import { SubmitBtn } from "@/components/settings/SubmitBtn"
import { Input } from "@/components/common/Input"

const ChangeNameFormComponent = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const currentName = useAppSelector(state => state.profileReducer.name)

    const { register:nameReg, handleSubmit:nameSub, formState: { errors:nameErr, touchedFields:nameTouched } } = useForm<INameForm>({ mode: 'onChange' })

    const { mutateAsync:setName, isLoading:isSettingName } = useMutation('set name', (data: TextProps) => SettingsService.setName(data.text, data.id),
        {
            onSuccess(res) {
                dispatch(setUserName(res))
                notify('Your name was successfully changed', 'success')
            },
            onError: (): any => notify('Your name was not change, try again', 'error')
        }
    )

    const nameSubmit: SubmitHandler<INameForm> = async (data) => (data.name !== currentName) && await setName({ text: data.name, id })

    return(
        <form onSubmit={nameSub(nameSubmit)} className={styles['input-container']}>
            {/*<Input type={'text'} error={!(nameErr.name?.message && nameTouched.name)} register={nameReg} name={'name'} patternValue={/^[a-z]+$/i}*/}
            {/*       minLength={3} maxLength={10} placeholder={'Your new name'}*/}
            {/*/>*/}
            <SubmitBtn isLoading={isSettingName} />
        </form>
    )
}

export const ChangeNameForm = React.memo(ChangeNameFormComponent)
