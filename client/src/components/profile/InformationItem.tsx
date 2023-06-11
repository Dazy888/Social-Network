import React, { useRef, useState } from "react"
import { SetInfoFunc } from "@/models/profile"
import styles from '@/styles/Profile.module.scss'

interface IProps {
    userId?: string
    editStatus: boolean
    setEditStatus: (status: boolean) => void
    textId: string
    text: string
    title: string
    setText: any
    forView?: boolean
}

function editInfo(event: any, changeText: SetInfoFunc, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textareaRef: any, userId: string) {
    function setStatuses(status: boolean) {
        setEditStatus(status)
        setStatus(status)
    }

    setStatuses(true)

    setTimeout(() => {
        const textarea = textareaRef.current
        textarea.value = value
        textarea.onblur = async () => {
            await changeText({ text: textarea.value, userId })
            text.innerText = textarea.value
            document.onkeydown = null
            setStatuses(false)
        }
    }, 1)
}

const InformationItemComponent: React.FC<IProps> = ({ text, setText, textId, setEditStatus, editStatus, title, forView, userId = '' }) => {
    const [status, setStatus] = useState(false)
    const textareaRef: any = useRef()
    const textRef: any = useRef()

    return(
        <div className={styles['information__item']}>
            <div className={`${styles['information__title']} flex justify-between items-center`}>
                <h3 className={'tracking-wide'}>{title}:</h3>
                {!forView &&
                    <button className={'text-xs'} disabled={editStatus} onClick={(e) => editInfo(e, setText, text, textId, setStatus, setEditStatus, textRef.current, textareaRef, userId)}>
                        <i className={'fa-solid fa-pen'}/>
                    </button>
                }
            </div>
            {status ? <textarea className={'mt-2.5 rounded-lg pb-2.5 pt-1'} ref={textareaRef} maxLength={100}/> : <p ref={textRef} className={'text-sm opacity-70 my-2.5'}>{text}</p>}
        </div>
    )
}

export const InformationItem = React.memo(InformationItemComponent)
