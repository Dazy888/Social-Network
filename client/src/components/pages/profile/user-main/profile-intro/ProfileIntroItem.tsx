import React, { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { ProfileIntroFields, ProfileIntroProps } from "@/models/profile.models"
import { setProfileIntro } from "@/store/reducers/ProfileSlice"
import { notify } from "@/components/pages/auth/AuthForm"
import { useMutation } from "react-query"
// Styles
import styles from '@/styles/Profile.module.scss'
// Service
import { ProfileService } from "@/services/profile.service"

interface MutateProfileIntro extends ProfileIntroProps {
    id: string
}

interface Props {
    currentText: string
    title: string
    field: ProfileIntroFields
    id?: string
    forView?: boolean
}

const InformationItemComponent: React.FC<Props> = ({ currentText, title, forView, id = '', field }) => {
    const dispatch = useAppDispatch()
    const [isEditable, setIsEditable] = useState(false)

    const { watch, setValue, setFocus, register } = useForm<Pick<ProfileIntroProps, 'text'>>({ mode: "onChange" })
    const text = watch('text')

    function startEditing() {
        setIsEditable(true)
        setValue('text', currentText)
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

    const { mutateAsync:setProfileIntroField } = useMutation('set profile intro', (data: MutateProfileIntro) => ProfileService.setProfileIntro(data.text, data.field, data.id),
        {
            onSuccess: (res): any => dispatch(setProfileIntro({ text: res.text, field: res.field })),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div className={styles['profile-intro__item']}>
            <div className={`${styles['profile-intro__title']} flex justify-between items-center`}>
                <h3 className={'tracking-wide'}>{title}:</h3>
                {!forView &&
                    <button className={'text-sm'}>
                        { isEditable
                            ?   <span>
                                    <i onClick={submitClickListener} className={`fa-solid fa-check mr-4 ${styles.submit}`} />
                                    <i onClick={cancelEditing} className={'fa-solid fa-xmark text-red'} />
                                </span>
                            :   <i onClick={startEditing} className={'fa-solid fa-pen'} /> }
                    </button>
                }
            </div>
            {isEditable ? <textarea className={'rounded-lg px-2.5 py-3 text-black text-sm'} maxLength={150} {...(register('text'))}/> : <p className={'text-sm opacity-70 my-2.5'}>{currentText}</p>}
        </div>
    )
}

export const ProfileIntroItem = React.memo(InformationItemComponent)
