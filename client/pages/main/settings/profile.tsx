import React from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
// Layouts
import { MainLayout } from "../../../layouts/Main-Layout"
import { SettingsLayout } from "../../../layouts/Settings-Layout"
// Styles
// @ts-ignore
import styles from '../../../styles/Settings.module.scss'
// Components
import { Input } from "../../authorization/components/Input"
import { LoginLoader } from "../../authorization/components/Loader"
import { InputFile } from "../profile/components/Input-File"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Typification
import { AvatarInterface, BannerInterface, LocationInterface, NameInterface } from "./types/settings-types"
import { TextProps } from "../profile/types/profile-types"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { ProfileService } from "../../../services/profile-service"
// Store
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
import { getAvatar, getBanner, getId, getLocation, getName } from "../../../store/reducers/profile/profile-selectors"
export default function Profile() {
    const dispatch = useDispatch()

    const id = useSelector(getId)
    const currentName = useSelector(getName)
    const currentLocation = useSelector(getLocation)
    const currentAvatar = useSelector(getAvatar)
    const currentBanner = useSelector(getBanner)

    const { register:nameReg, handleSubmit:nameSub, formState: { errors:nameErr, touchedFields:nameTouched } } = useForm<NameInterface>({ mode: 'onChange' })
    const { register:locationReg, handleSubmit:locationSub, formState: { errors:locationErr, touchedFields:locationTouched } } = useForm<LocationInterface>({ mode: 'onChange' })
    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatar, watch:watchAvatar } = useForm<AvatarInterface>({ mode: 'onChange' })
    const { register:bannerReg, handleSubmit:bannerSub, setValue:setBanner, watch:watchBanner } = useForm<BannerInterface>({ mode: 'onChange' })

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

    const { mutateAsync:changeName, isLoading } = useMutation('change name', (data: TextProps) => ProfileService.changeName(data.text, data.id),
        {
            onSuccess(response) {
                changeTxt('input[name=name]', response.data, profileActions.setName)
            }
        }
    )

    const { mutateAsync:changeLocation } = useMutation('change location', (data: TextProps) => ProfileService.changeLocation(data.text, data.id),
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
    const nameSubmit: SubmitHandler<NameInterface> = async (data) => {
        if (data.name === currentName) return
        await changeName({text: data.name, id})
    }
    const locationSubmit: SubmitHandler<LocationInterface> = async (data) => {
        if (data.location === currentLocation) return
        await changeLocation({text: data.location, id})
    }
    const avatarSubmit: SubmitHandler<AvatarInterface> = async (data) => {
        await sendPhoto(avatarValue, currentAvatar, changeAvatar)
    }
    const bannerSubmit: SubmitHandler<BannerInterface> = async (data) => {
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
        <MainLayout>
            <SettingsLayout>
                <Head>
                    <title>Profile Settings</title>
                </Head>
                <div className={styles['settings-form']}>
                    <h3 className={styles['title']}>Profile Settings</h3>
                    <hr/>
                    <div className={styles['form']}>
                        <div className={`${styles['row']} flex-between`}>
                            <form onSubmit={nameSub(nameSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={nameErr.name?.message} touched={nameTouched.name} register={nameReg} name={'name'} patternValue={/^[a-z]+$/i} minLength={3} maxLength={10} placeholder={'Your new name'}/>
                                <button disabled={isLoading} className={styles['btn']}>Change name</button>
                            </form>
                            <form onSubmit={locationSub(locationSubmit)} className={styles['input-container']}>
                                <Input type={'text'} error={locationErr.location?.message} touched={locationTouched.location} register={locationReg} name={'location'} patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={15} placeholder={'Your new location'}/>
                                <button className={styles['btn']}>Change location</button>
                            </form>
                        </div>
                        <div className={`${styles['files']} flex-between`}>
                            <form onSubmit={avatarSub(avatarSubmit)}>
                                <InputFile label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatar} currentValue={avatarValue?.name}/>
                                <button className={styles['btn']}>Change avatar</button>
                            </form>
                            <form onSubmit={bannerSub(bannerSubmit)}>
                                <InputFile label={'Banner'} name={'banner'} register={bannerReg} setValue={setBanner} currentValue={bannerValue?.name}/>
                                <button className={styles['btn']}>Change banner</button>
                            </form>
                        </div>
                        <LoginLoader color={'rebeccapurple'} loading={isLoading}/>
                    </div>
                </div>
            </SettingsLayout>
        </MainLayout>
    )
}