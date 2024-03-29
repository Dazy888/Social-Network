import React, { ChangeEvent, RefObject, useRef } from "react"
import { useMutation } from "react-query"
import { IUserProfile } from "@/models/auth.models"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
// Styles
import styles from "@/styles/Profile.module.scss"
// Service
import { ProfileService } from "@/services/profile.service"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Store
import { setProfileImage } from "@/store/reducers/ProfileSlice"
// Loader
import { PulseLoader } from "react-spinners"

interface Props extends Pick<IUserProfile, 'avatar' | 'name' | 'location'> {
    forView: boolean
}

const UserInfoComponent: React.FC<Props> = ({ avatar, name, location, forView}) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)

    async function changeListener(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0]

            if (file) {
                let data = new FormData()
                data.append('userId', id)
                data.append('image', file)
                data.append('field', 'avatar')

                await mutateAsync(data)

                e.target.value = ''
                e.target.type = 'text'
                e.target.type = 'file'
            }
        }
    }

    function clickHandler() {
        if (inputRef.current) inputRef.current.click()
    }

    const { mutateAsync, isLoading } = useMutation('upload avatar', (data: FormData) => ProfileService.uploadProfileImage(data),
        {
            onSuccess(res) {
                notify('Profile image changed successfully', 'success')
                dispatch(setProfileImage(res))
            },
            onError: (): any => notify('Something went wrong, reload page and try again', 'error')
        }
    )

    return(
        <div className={`${styles.user} absolute z-10 text-center text-white`}>
            <div className={'relative'}>
                <img alt={'Avatar'} className={'rounded-full mb-3 object-cover mx-auto'} src={avatar} />
                { !forView &&
                    <label className={`z-10 block absolute rounded-full w-6 h-6`}>
                        <button onClick={clickHandler} className={'w-full h-full rounded-full'}>
                            <i className={'fa-solid fa-camera-retro text-xs'} />
                        </button>
                        <input ref={inputRef} disabled={isLoading} accept={'image/*'} className={'hidden'} type={'file'} onChange={(e) => changeListener(e)}/>
                    </label>
                }
                { isLoading && <div className={`absolute top-0 ${styles['loader-background']}`}></div> }
                { isLoading && <PulseLoader className={`absolute z-10 ${styles['avatar-loader']}`} color={'#f92552'} /> }
            </div>
            <h2 className={'text-2xl font-medium mb-1.5'}>{name}</h2>
            <p className={'tracking-wide'}>{location}</p>
        </div>
    )
}

export const UserInfo = React.memo(UserInfoComponent)
