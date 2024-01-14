import React, { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { ProfileIntroFields, ProfileIntro } from "@/models/profile.models"
import { setProfileIntro } from "@/store/reducers/ProfileSlice"
import { notify } from "@/components/pages/auth/form/AuthForm"
import { useMutation } from "react-query"
// Styles
import styles from '@/styles/Profile.module.scss'
// Service
import { ProfileService } from "@/services/profile.service"
// Components
import { TextArea } from "@/components/pages/profile/main-section/profile-intro/TextArea"

interface MutateProfileIntro extends ProfileIntro {
    id: string
}

interface Props {
    currentText: string | null
    title: string
    field: ProfileIntroFields
    placeholder: string
    id?: string
    forView?: boolean
}

const InformationItemComponent: React.FC<Props> = ({ currentText, title, forView, id = '', field, placeholder }) => {
    const dispatch = useAppDispatch()
    const [isEditable, setIsEditable] = useState(false)

    const { watch, setValue, setFocus, register } = useForm<Pick<ProfileIntro, 'text'>>({ mode: "onChange" })
    const text = watch('text')

    function startEditing() {
        setIsEditable(true)
        setValue('text', currentText || '')
        setFocus('text')
    }

    function cancelEditing() {
        setIsEditable(false)
        setValue('text', '')
    }

    async function changeProfileIntro() {
        if (currentText === text) return notify("You haven't made changes", 'warning')
        await setProfileIntroField({ text, field, id })
        dispatch(setProfileIntro({ text, field }))
        setIsEditable(false);
    }

    async function submitClickListener() {
        await changeProfileIntro()
    }

    function updateProfileFunc(data: MutateProfileIntro) {
        const mutateData: any = {
            [data.field]: data.text
        }

        return ProfileService.updateProfile(mutateData, data.id)
    }

    const { mutateAsync:setProfileIntroField} = useMutation('update profile', updateProfileFunc, {
            onSuccess: (res): any => dispatch(setProfileIntro({ text: res.text, field: res.field })),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div className={styles['profile-intro__item']}>
            <div className={`${styles['profile-intro__title']} flex justify-between items-center mb-2.5`}>
                <h4 className={'tracking-wide'}>{title}:</h4>
                {!forView &&
                    <button className={'text-sm'}>
                        { isEditable
                            ?   <span className={styles['profile-intro__actions']}>
                                    <i onClick={submitClickListener} className={'fa-solid fa-check mr-4'} />
                                    <i onClick={cancelEditing} className={'fa-solid fa-xmark'} />
                                </span>
                            :   <i onClick={startEditing} className={`fa-solid fa-pen ${styles.pen}`} /> }
                    </button>
                }
            </div>
            { isEditable ? <TextArea register={register} placeholder={placeholder} /> : <p className={'text-sm tracking-wide'}>{currentText}</p> }
        </div>
    )
}

export const ProfileIntroItem = React.memo(InformationItemComponent)
