import React, { useState } from "react"
import styles from '@/styles/Profile.module.scss'
import { useAppDispatch } from "@/hooks/redux"
import { useForm } from "react-hook-form"
import { ProfileIntroFields, ProfileIntroForm, TextProps } from "@/models/profile.models"
import { setProfileIntro } from "@/store/reducers/ProfileSlice"
import { notify } from "@/components/auth/AuthForm"

interface Props {
    currentText: string
    title: string
    asyncRequest: (data: TextProps) => void
    field: ProfileIntroFields
    id?: string
    forView?: boolean
}

const InformationItemComponent: React.FC<Props> = ({ currentText, asyncRequest, title, forView, id = '', field }) => {
    const dispatch = useAppDispatch()
    const [isEditable, setIsEditable] = useState(false)

    const { watch, setValue, setFocus, register } = useForm<ProfileIntroForm>({ mode: "onChange" })
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
        await asyncRequest({ text, id })
        dispatch(setProfileIntro({ text, field }))
        setIsEditable(false);
    }

    async function submitClickListener() {
        await changeProfileIntro()
    }

    return(
        <div className={styles['information__item']}>
            <div className={`${styles['information__title']} flex justify-between items-center`}>
                <h3 className={'tracking-wide'}>{title}:</h3>
                {!forView &&
                    <button className={'text-sm'}>
                        { isEditable
                            ?   <span>
                                    <i onClick={submitClickListener} className={`fa-solid fa-check mr-4 ${styles.submit}`} />
                                    <i onClick={cancelEditing} className={`fa-solid fa-xmark ${styles.cancel}`} />
                                </span>
                            : <i onClick={startEditing} className={'fa-solid fa-pen'} /> }
                    </button>
                }
            </div>
            {isEditable ? <textarea className={'rounded-lg px-2.5 py-3 text-black text-sm'} maxLength={150} {...(register('text'))}/> : <p className={'text-sm opacity-70 my-2.5'}>{currentText}</p>}
        </div>
    )
}

export const InformationItem = React.memo(InformationItemComponent)
