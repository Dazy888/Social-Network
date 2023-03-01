import React, { useRef, useState } from "react"
import { EditInfoFunc } from "@/interfaces/profile-interfaces"
import styles from '@/styles/Profile.module.scss'

interface Props {
    id?: string
    editStatus: boolean
    setEditStatus: (status: boolean) => void
    textId: string
    text: string
    title: string
    changeText: any
    forView?: boolean
    editInfo: EditInfoFunc
}

const InformationItemComponent: React.FC<Props> = ({ editInfo, text, changeText, textId, setEditStatus, editStatus, title, forView, id= '' }) => {
    const [status, setStatus] = useState(false)
    const textareaRef: any = useRef()
    const textRef: any = useRef()

    return(
        <div className={styles['information__item']}>
            <div className={`${styles['information__title']} flex-between`}>
                <h3>{title}</h3>
                {!forView
                    ?   <button disabled={editStatus} onClick={e => editInfo(e, changeText, text, textId, setStatus, setEditStatus, textRef.current, textareaRef, id)}>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    :   null
                }
            </div>
            {status ? <textarea ref={textareaRef} maxLength={100}/> : <p ref={textRef} className={styles['text']}>{text}</p>}
        </div>
    )
}

export const InformationItem = React.memo(InformationItemComponent)