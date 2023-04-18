import React from "react"
import Head from "next/head"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/auth/Loader"
import { FileInput } from "@/components/profile/FileInput"
import { Title } from "@/components/settings/Title"
import { SubmitBtn } from "@/components/settings/SubmitBtn"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Models
import { IAvatarForm, IBannerForm, ILocationForm, INameForm } from "@/models/settings"
import { TextProps } from "@/models/profile"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { SettingsService } from "@/services/settings.service"
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
// Store
import {setAvatarSrc, setBannerSrc, setUserLocation, setUserName} from "@/store/reducers/ProfileSlice"

const Profile = () => {
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profileReducer.userId) 
    const currentName = useAppSelector(state => state.profileReducer.name)
    const currentLocation = useAppSelector(state => state.profileReducer.location)
    const currentAvatar = useAppSelector(state => state.profileReducer.avatar)
    const currentBanner = useAppSelector(state => state.profileReducer.banner)

    const { register:nameReg, handleSubmit:nameSub, formState: { errors:nameErr, touchedFields:nameTouched } } = useForm<INameForm>({ mode: 'onChange' })
    const { register:locationReg, handleSubmit:locationSub, formState: { errors:locationErr, touchedFields:locationTouched } } = useForm<ILocationForm>({ mode: 'onChange' })
    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatarValue, watch:watchAvatar } = useForm<IAvatarForm>({ mode: 'onChange' })
    const { register:bannerReg, handleSubmit:bannerSub, setValue:setBannerValue, watch:watchBanner } = useForm<IBannerForm>({ mode: 'onChange' })

    const avatarValue = watchAvatar('avatar')
    const bannerValue = watchBanner('banner')

    const setText = (selector: string, text: string, action: (text: string) => any) => {
        const input: any = document.querySelector(selector)
        input.classList.add('success')
        dispatch(action(text))
    }

    const setPhoto = (selector: string, link: string, value: string) => {
        const circle: any = document.querySelector(selector)
        circle.classList.add('success-image')
        (value === 'avatar') ? dispatch(setAvatarSrc(link)) : dispatch(setBannerSrc(link))
    }

    const { mutateAsync:setName, isLoading:isSettingName } = useMutation('set name', (data: TextProps) => SettingsService.setName(data.text, data.userId),
        {
            onSuccess(res) {
                setText('input[name=name]', res.data, setUserName)
            }
        }
    )

    const { mutateAsync:setLocation, isLoading:isSettingLocation } = useMutation('set location', (data: TextProps) => SettingsService.setLocation(data.text, data.userId),
        {
            onSuccess(res) {
                setText('input[name=location]', res.data, setUserLocation)
            }
        }
    )

    const { mutateAsync:setAvatar, isLoading:isSettingAvatar } = useMutation('set avatar', (data: FormData) => SettingsService.setAvatar(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=avatar]', res.data, 'avatar')
            }
        }
    )

    const { mutateAsync:setBanner, isLoading:isSettingBanner } = useMutation('set banner', (data: FormData) => SettingsService.setBanner(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=banner]', res.data, 'banner')
            }
        }
    )

    const nameSubmit: SubmitHandler<INameForm> = async (data) => (data.name !== currentName) && await setName({ text: data.name, userId })
    const locationSubmit: SubmitHandler<ILocationForm> = async (data) => (data.location !== currentLocation) && await setLocation({ text: data.location, userId })
    const avatarSubmit: SubmitHandler<IAvatarForm> = async () => await sendPhoto(avatarValue, currentAvatar, setAvatar)
    const bannerSubmit: SubmitHandler<IBannerForm> = async () => await sendPhoto(bannerValue, currentBanner, setBanner)

    const sendPhoto = async (photo: File, currentPath: string, setPhoto: (data: FormData) => void) => {
        let data = new FormData()
        data.append('image', photo)
        data.append('userId', userId)
        data.append('currentPath', currentPath)
        await setPhoto(data)
    }

    return(
        <MainPage>
            <SettingsPage>
                <Head>
                    <title>Profile Settings</title>
                </Head>
                <>
                    <Title title={'Profile Settings'}/>
                    <hr className={'w-full h-px'}/>
                    <div className={`${styles.forms} py-10 px-6`}>
                        <div className={`${styles.inputs} flex justify-between items-center`}>
                            <form onSubmit={nameSub(nameSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={nameErr.name?.message} touched={nameTouched.name} register={nameReg} name={'name'} patternValue={/^[a-z]+$/i} minLength={3} maxLength={10} placeholder={'Your new name'}/>
                                <SubmitBtn isLoading={isSettingName}/>
                            </form>
                            <form onSubmit={locationSub(locationSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={locationErr.location?.message} touched={locationTouched.location} register={locationReg} name={'location'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={15} placeholder={'Your new location'}/>
                                <SubmitBtn isLoading={isSettingLocation}/>
                            </form>
                        </div>
                        <div className={`${styles.files} flex justify-between items-center`}>
                            <form onSubmit={avatarSub(avatarSubmit)}>
                                <FileInput label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatarValue} currentValue={avatarValue?.name}/>
                                <SubmitBtn isLoading={isSettingAvatar}/>
                            </form>
                            <form onSubmit={bannerSub(bannerSubmit)}>
                                <FileInput label={'Banner'} name={'banner'} register={bannerReg} setValue={setBannerValue} currentValue={bannerValue?.name}/>
                                <SubmitBtn isLoading={isSettingBanner}/>
                            </form>
                        </div>
                        <Loader color={'rebeccapurple'} loading={isSettingName || isSettingLocation || isSettingAvatar || isSettingBanner}/>
                    </div>
                </>
            </SettingsPage>
        </MainPage>
    )
}

export default React.memo(Profile)
