import React from "react"
import styles from "@/styles/Settings.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useMutation } from "react-query"
import { ActivateProps } from "@/models/settings.models"
import { SettingsService } from "@/services/settings.service"
import { setEmail } from "@/store/reducers/SettingsSlice"
import { notify } from "@/components/auth/AuthForm"

const ActivationMessageComponent = () => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync:cancelActivation } = useMutation('cancel activation', (data: Pick<ActivateProps, 'id'>) => SettingsService.cancelActivation(data.id),
        {
            onSuccess() {
                dispatch(setEmail(''))
                notify('Activation was canceled successfully', 'success')
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div>
            <p className={`${styles['activation-text']} text-lg font-medium text-center`}>The activation link was sent on your E-mail</p>
            <button className={`${styles.cancel} rounded-2xl text-lg font-medium duration-300 my-7 mx-auto block text-white`} onClick={() => cancelActivation({ id })}>Cancel</button>
        </div>
    )
}

export const ActivationMessage = React.memo(ActivationMessageComponent)
