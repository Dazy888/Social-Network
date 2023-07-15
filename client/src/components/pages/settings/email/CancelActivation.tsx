import React from "react"
import styles from "@/styles/Settings.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { setEmail } from "@/store/reducers/SettingsSlice"
import { notify } from "@/components/pages/auth/form/AuthForm"
import { ActivateEmailParams } from "@/models/settings.models"

interface Props {
    setValue: any
    setIsFocus: (state: boolean) => void
}

const CancelActivationComponent: React.FC<Props> = ({ setValue, setIsFocus}) => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync:cancelActivation, isLoading } = useMutation('cancel activation', (data: Pick<ActivateEmailParams, 'id'>) => SettingsService.cancelActivation(data.id),
        {
            onSuccess() {
                notify('Activation canceled successfully', 'success')
                dispatch(setEmail(''))
                setValue('email', '')
                setIsFocus(false)
            },
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <>
            <hr />
            <button disabled={isLoading} className={`${styles.cancel} rounded-lg py-2 px-10 text-lg font-medium duration-300 my-7 mx-auto block text-white`}
                    onClick={() => cancelActivation({ id })}>Cancel</button>
        </>
    )
}

export const CancelActivation = React.memo(CancelActivationComponent)
