import React from "react"
import styles from "@/styles/Settings.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useMutation } from "react-query"
// Service
import { SettingsService } from "@/services/settings.service"
// Store
import { setEmail } from "@/store/reducers/SettingsSlice"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Models
import { ActivateEmailParams } from "@/models/settings.models"

interface Props {
    setValue: any
    setIsFocus: (state: boolean) => void
}

const CancelActivationComponent: React.FC<Props> = ({ setValue, setIsFocus}) => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profileReducer.id)

    const mutationFunc = (data: Pick<ActivateEmailParams, 'userId'>) => SettingsService.cancelActivation(data.userId)
    const { mutateAsync:cancelActivation, isLoading } = useMutation('cancel activation', mutationFunc,
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
                    onClick={() => cancelActivation({ userId })}>Cancel</button>
        </>
    )
}

export const CancelActivation = React.memo(CancelActivationComponent)
