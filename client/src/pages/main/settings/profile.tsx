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
import { Loader } from "@/components/auth/Loader"
import { FileInput } from "@/components/profile/FileInput"
import { Title } from "@/components/settings/Title"
// Form
import { SubmitHandler, useForm } from "react-hook-form"
// Interfaces
import { IAvatarForm, IBannerForm, ILocationForm, INameForm } from "@/interfaces/settings.interfaces"
import { TextProps } from "@/interfaces/profile.interfaces"
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { ProfileService } from "@/services/profile.service"
// Store
import { profileActions } from "@/store/reducers/profile/profile.reducer"
import { getAvatar, getBanner, getUserId, getLocation, getName } from "@/store/reducers/profile/profile.selectors"

const Profile = () => {
    const dispatch = useDispatch()

    const userId = useSelector(getUserId)
    const currentName = useSelector(getName)
    const currentLocation = useSelector(getLocation)
    const currentAvatar = useSelector(getAvatar)
    const currentBanner = useSelector(getBanner)

    const { register:nameReg, handleSubmit:nameSub, formState: { errors:nameErr, touchedFields:nameTouched } } = useForm<INameForm>({ mode: 'onChange' })
    const { register:locationReg, handleSubmit:locationSub, formState: { errors:locationErr, touchedFields:locationTouched } } = useForm<ILocationForm>({ mode: 'onChange' })
    const { register:avatarReg, handleSubmit:avatarSub, setValue:setAvatar, watch:watchAvatar } = useForm<IAvatarForm>({ mode: 'onChange' })
    const { register:bannerReg, handleSubmit:bannerSub, setValue:setBanner, watch:watchBanner } = useForm<IBannerForm>({ mode: 'onChange' })

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
        (value === 'avatar') ? dispatch(profileActions.setAvatar(link)) : dispatch(profileActions.setBanner(link))
    }

    const { mutateAsync:changeName, isLoading } = useMutation('change name', (data: TextProps) => ProfileService.setName(data.text, data.userId),
        {
            onSuccess(res) {
                setText('input[name=name]', res.data, profileActions.setName)
            }
        }
    )

    const { mutateAsync:changeLocation } = useMutation('change location', (data: TextProps) => ProfileService.setLocation(data.text, data.userId),
        {
            onSuccess(res) {
                setText('input[name=location]', res.data, profileActions.setLocation)
            }
        }
    )

    const { mutateAsync:changeAvatar } = useMutation('change avatar', (data: FormData) => ProfileService.setAvatar(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=avatar]', res.data, 'avatar')
            }
        }
    )

    const { mutateAsync:changeBanner } = useMutation('change banner', (data: FormData) => ProfileService.setBanner(data),
        {
            onSuccess(res) {
                setPhoto('div[data-name=banner]', res.data, 'banner')
            }
        }
    )

    const nameSubmit: SubmitHandler<INameForm> = async (data) => (data.name !== currentName) && await changeName({ text: data.name, userId })
    const locationSubmit: SubmitHandler<ILocationForm> = async (data) => (data.location !== currentLocation) && await changeLocation({text: data.location, userId})
    const avatarSubmit: SubmitHandler<IAvatarForm> = async () => await sendPhoto(avatarValue, currentAvatar, changeAvatar)
    const bannerSubmit: SubmitHandler<IBannerForm> = async () => await sendPhoto(bannerValue, currentBanner, changeBanner)

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
                                <FileInput label={'Avatar'} name={'avatar'} register={avatarReg} setValue={setAvatar} currentValue={avatarValue?.name}/>
                                <button className={'text-sm font-semibold rounded-lg mx-auto py-1 px-4'}>Change avatar</button>
                            </form>
                            <form onSubmit={bannerSub(bannerSubmit)}>
                                <FileInput label={'Banner'} name={'banner'} register={bannerReg} setValue={setBanner} currentValue={bannerValue?.name}/>
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
