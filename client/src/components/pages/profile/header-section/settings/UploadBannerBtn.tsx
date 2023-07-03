import React, { ChangeEvent, RefObject, useEffect, useRef } from "react"
import { useMutation } from "react-query"
import styles from "@/styles/Profile.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { ProfileService } from "@/services/profile.service"
import { notify } from "@/components/pages/auth/AuthForm"
import { setProfileImage } from "@/store/reducers/ProfileSlice"

interface Props {
    setBannerLoading : (state: boolean) => void
}

const UploadBannerBtnComponent: React.FC<Props> = ({ setBannerLoading }) => {
    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const dispatch = useAppDispatch()

    const id = useAppSelector(state => state.profileReducer.id)

    async function changeListener(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0]

            if (file) {
                let data = new FormData()
                data.append('id', id)
                data.append('image', file)
                data.append('field', 'banner')

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

    const { mutateAsync, isLoading } = useMutation('upload banner', (data: FormData) => ProfileService.uploadProfileImage(data),
        {
            onSuccess(res) {
                notify('Profile image was changed successfully', 'success')
                dispatch(setProfileImage(res))
            },
            onError: (): any => notify('Something went wrong, reload page and try again', 'error')
        }
    )

    useEffect(() => setBannerLoading(isLoading), [isLoading])

    return(
        <div className={'absolute right-2 bottom-24'}>
            <label className={`block relative cursor-pointer ${styles['upload-banner']}`}>
                <button onClick={clickHandler} type={'button'} className={'z-10 absolute w-full tracking-wide text-sm mui-btn-color block text-center text-white py-2 rounded-md duration-300'}>
                    <i className={'fa-solid fa-camera mr-2'} />
                    <span>Upload photo</span>
                </button>
                <input ref={inputRef} disabled={isLoading} accept={'image/*'} className={'hidden'} type={'file'} />
            </label>
        </div>
    )
}

export const UploadBannerBtn = React.memo(UploadBannerBtnComponent)
