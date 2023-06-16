import React from "react"
import {FileInput} from "@/components/settings/FileInput";
import {SubmitBtn} from "@/components/settings/SubmitBtn";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAvatarForm} from "@/models/settings.models";
import {useMutation} from "react-query";
import {SettingsService} from "@/services/settings.service";
import {notify} from "@/components/auth/AuthForm";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const ChangeAvatarFormComponents = () => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.profileReducer.id)
    const currentAvatar = useAppSelector(state => state.profileReducer.avatar)
    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatarValue, watch:watchAvatar } = useForm<IAvatarForm>({ mode: 'onChange' })
    const { mutateAsync:setAvatar, isLoading:isSettingAvatar } = useMutation('set avatar', (data: FormData) => SettingsService.setAvatar(data),
        {
            onSuccess(res) {

                notify('Your avatar was successfully changed', 'success')
            },
            onError: (): any => notify('Your avatar was not change, try again', 'error')
        }
    )
    // const avatarSubmit: SubmitHandler<IAvatarForm> = async () => await sendPhoto(avatarValue, currentAvatar, setAvatar)
    return(
        <div></div>
        // <form onSubmit={avatarSub(avatarSubmit)}>
        //     <FileInput label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatarValue} currentValue={avatarValue?.name}/>
        //     <SubmitBtn isLoading={isSettingAvatar}/>
        // </form>
    )
}

export const ChangeAvatarForm = React.memo(ChangeAvatarFormComponents)
