import React from "react"
import { useMutation } from "react-query"
import { SettingsService } from "@/services/settings.service"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setAvatarSrc, setBannerSrc, setUserLocation, setUserName } from "@/store/reducers/ProfileSlice"
import { SubmitHandler, useForm } from "react-hook-form"
import { notify } from "@/components/auth/AuthForm"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { SettingsPage } from "@/layouts/SettingsPageLayout"
import { Loader } from "@/components/auth/Loader"
import { FileInput } from "@/components/settings/FileInput"
import { Title } from "@/components/settings/Title"
import { SubmitBtn } from "@/components/settings/SubmitBtn"
// Models
import { IAvatarForm, IBannerForm, ILocationForm, INameForm } from "@/models/settings.models"
import {ChangeNameForm} from "@/components/settings/profile/ChangeNameForm";
import {ChangeLocationForm} from "@/components/settings/profile/ChangeLocationForm";

const Profile = () => {
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)
    const currentAvatar = useAppSelector(state => state.profileReducer.avatar)
    const currentBanner = useAppSelector(state => state.profileReducer.banner)

    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatarValue, watch:watchAvatar } = useForm<IAvatarForm>({ mode: 'onChange' })
    const { register:bannerReg, handleSubmit:bannerSub, setValue:setBannerValue, watch:watchBanner } = useForm<IBannerForm>({ mode: 'onChange' })

    const avatarValue = watchAvatar('avatar')
    const bannerValue = watchBanner('banner')

    const setPhoto = (selector: string, link: string, value: string) => {
        const circle: any = document.querySelector(selector)
        circle.classList.add('success-image')
        (value === 'avatar') ? dispatch(setAvatarSrc(link)) : dispatch(setBannerSrc(link))
    }

    const { mutateAsync:setAvatar, isLoading:isSettingAvatar } = useMutation('set avatar', (data: FormData) => SettingsService.setAvatar(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=avatar]', res, 'avatar')
                notify('Your avatar was successfully changed', 'success')
            },
            onError: (): any => notify('Your avatar was not change, try again', 'error')
        }
    )

    const { mutateAsync:setBanner, isLoading:isSettingBanner } = useMutation('set banner', (data: FormData) => SettingsService.setBanner(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=banner]', res, 'banner')
                notify('Your banner was successfully changed', 'success')
            },
            onError: (): any => notify('Your banner was not change, try again', 'error')
        }
    )

    const avatarSubmit: SubmitHandler<IAvatarForm> = async () => await sendPhoto(avatarValue, currentAvatar, setAvatar)
    const bannerSubmit: SubmitHandler<IBannerForm> = async () => await sendPhoto(bannerValue, currentBanner, setBanner)

    const sendPhoto = async (photo: File, currentPath: string, setPhoto: (data: FormData) => void) => {
        let data = new FormData()
        data.append('image', photo)
        data.append('id', id)
        data.append('currentPath', currentPath)
        await setPhoto(data)
    }

    return(
        <SettingsPage title={'Profile settings'}>
            {/*<Title title={'Profile Settings'}/>*/}
            {/*<hr className={'w-full h-px'}/>*/}
            {/*<div className={`${styles.forms} py-10 px-6`}>*/}
            {/*    <div className={`${styles.inputs} flex justify-between items-center`}>*/}
            {/*        <ChangeNameForm />*/}
            {/*        <ChangeLocationForm />*/}
            {/*    </div>*/}
            {/*    <div className={`${styles.files} flex justify-between items-center`}>*/}
            {/*        <form onSubmit={avatarSub(avatarSubmit)}>*/}
            {/*            <FileInput label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatarValue} currentValue={avatarValue?.name}/>*/}
            {/*            <SubmitBtn isLoading={isSettingAvatar}/>*/}
            {/*        </form>*/}
            {/*        <form onSubmit={bannerSub(bannerSubmit)}>*/}
            {/*            <FileInput label={'Banner'} name={'banner'} register={bannerReg} setValue={setBannerValue} currentValue={bannerValue?.name}/>*/}
            {/*            <SubmitBtn isLoading={isSettingBanner}/>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*    <Loader color={'rebeccapurple'} loading={isSettingName || isSettingLocation || isSettingAvatar || isSettingBanner}/>*/}
            {/*</div>*/}
        </SettingsPage>
    )
}

export default React.memo(Profile)
