import React from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
import { SettingsPage } from "@/layouts/SettingsPage-Layout"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { Input } from "@/components/common/Input"
import { Loader } from "@/components/authorization/Loader"
import { InputFile } from "@/components/profile/Input-File"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Interfaces
import { AvatarI, BannerI, LocationI, NameI } from "@/interfaces/settings-interfaces"
import { TextPropsI } from "@/interfaces/profile-interfaces"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { ProfileService } from "@/services/profile-service"
// Store
import { profileActions } from "@/store/reducers/profile/profile-reducer"
import { getAvatar, getBanner, getId, getLocation, getName } from "@/store/reducers/profile/profile-selectors"
import {Title} from "@/components/settings/Title";

const Profile = () => {
    const dispatch = useDispatch()

    const id = useSelector(getId)
    const currentName = useSelector(getName)
    const currentLocation = useSelector(getLocation)
    const currentAvatar = useSelector(getAvatar)
    const currentBanner = useSelector(getBanner)

    const { register:nameReg, handleSubmit:nameSub, formState: { errors:nameErr, touchedFields:nameTouched } } = useForm<NameI>({ mode: 'onChange' })
    const { register:locationReg, handleSubmit:locationSub, formState: { errors:locationErr, touchedFields:locationTouched } } = useForm<LocationI>({ mode: 'onChange' })
    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatar, watch:watchAvatar } = useForm<AvatarI>({ mode: 'onChange' })
    const { register:bannerReg, handleSubmit:bannerSub, setValue:setBanner, watch:watchBanner } = useForm<BannerI>({ mode: 'onChange' })

    const avatarValue = watchAvatar('avatar')
    const bannerValue = watchBanner('banner')

    function changeTxt(selector: string, txt: string, action: (text: string) => any) {
        const input: any = document.querySelector(selector)
        input.classList.add('success')
        dispatch(action(txt))
    }

    function changePhoto(selector: string, link: string, value: string) {
        const circle: any = document.querySelector(selector)
        circle.classList.add('success-image')

        if (value === 'avatar') {
            dispatch(profileActions.setAvatar(link))
        } else {
            dispatch(profileActions.setBanner(link))
        }
    }

    const { mutateAsync:changeName, isLoading } = useMutation('change name', (data: TextPropsI) => ProfileService.changeName(data.text, data.id),
        {
            onSuccess(response) {
                changeTxt('input[name=name]', response.data, profileActions.setName)
            }
        }
    )

    const { mutateAsync:changeLocation } = useMutation('change location', (data: TextPropsI) => ProfileService.changeLocation(data.text, data.id),
        {
            onSuccess(response) {
                changeTxt('input[name=location]', response.data, profileActions.setLocation)
            }
        }
    )

    const { mutateAsync:changeAvatar } = useMutation('change avatar', (data: FormData) => ProfileService.changeAvatar(data),
        {
            onSuccess(response) {
                changePhoto('div[data-name=avatar]', response.data, 'avatar')
            }
        }
    )

    const { mutateAsync:changeBanner } = useMutation('change banner', (data: FormData) => ProfileService.changeBanner(data),
        {
            onSuccess(response) {
                changePhoto('div[data-name=banner]', response.data, 'banner')
            }
        }
    )
    const nameSubmit: SubmitHandler<NameI> = async (data) => {
        if (data.name === currentName) return
        await changeName({text: data.name, id})
    }
    const locationSubmit: SubmitHandler<LocationI> = async (data) => {
        if (data.location === currentLocation) return
        await changeLocation({text: data.location, id})
    }
    const avatarSubmit: SubmitHandler<AvatarI> = async (data) => {
        await sendPhoto(avatarValue, currentAvatar, changeAvatar)
    }
    const bannerSubmit: SubmitHandler<BannerI> = async (data) => {
        await sendPhoto(bannerValue, currentBanner, changeBanner)
    }
    async function sendPhoto (photo: File, currentPhoto: string, changePhoto: (data: FormData) => void) {
        let data = new FormData()
        data.append('image', photo)
        data.append('id', id)
        data.append('currentPath', currentPhoto)
        await changePhoto(data)
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
                    <div className={`${styles['forms']} py-10 px-6`}>
                        <div className={`${styles['inputs']} flex justify-between items-center`}>
                            <form onSubmit={nameSub(nameSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={nameErr.name?.message} touched={nameTouched.name} register={nameReg} name={'name'} patternValue={/^[a-z]+$/i} minLength={3} maxLength={10} placeholder={'Your new name'}/>
                                <button disabled={isLoading} className={'block text-sm font-semibold rounded-lg mx-auto py-1 px-4'}>Change name</button>
                            </form>
                            <form onSubmit={locationSub(locationSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={locationErr.location?.message} touched={locationTouched.location} register={locationReg} name={'location'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={15} placeholder={'Your new location'}/>
                                <button className={'block text-sm font-semibold rounded-lg mx-auto py-1 px-4'}>Change location</button>
                            </form>
                        </div>
                        <div className={`${styles['files']} flex justify-between items-center`}>
                            <form onSubmit={avatarSub(avatarSubmit)}>
                                <InputFile label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatar} currentValue={avatarValue?.name}/>
                                <button className={'text-sm font-semibold rounded-lg mx-auto py-1 px-4'}>Change avatar</button>
                            </form>
                            <form onSubmit={bannerSub(bannerSubmit)}>
                                <InputFile label={'Banner'} name={'banner'} register={bannerReg} setValue={setBanner} currentValue={bannerValue?.name}/>
                                <button className={'text-sm font-semibold rounded-lg mx-auto py-1 px-4'}>Change banner</button>
                            </form>
                        </div>
                        <Loader color={'rebeccapurple'} loading={isLoading}/>
                    </div>
                </>
            </SettingsPage>
        </MainPage>
    )
}
export default React.memo(Profile)