import React, { useRef, useState } from "react"
import { ChangeInfo } from "../types/profile-types"

type PropsType = {
    editStatus: boolean
    setEditStatus: (status: boolean) => void
    textId: string
    id: number
    text: string
    title: string
    changeText: any
}

export default React.memo(function InformationItem({ text, changeText, id, textId, setEditStatus, editStatus, title }: PropsType) {
    const [status, setStatus] = useState<boolean>(false)
    const textareaRef: any = useRef()
    const textRef: any = useRef()

    function editInfo(event: any, changeText: ChangeInfo, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void) {
        function setStatuses(status: boolean) {
            setEditStatus(status)
            setStatus(status)
        }

        setStatuses(true)
        const text = textRef.current

        setTimeout(() => {
            const textarea = textareaRef.current
            textarea.value = value

            textarea.onblur = async () => {
                await changeText({text: textarea.value, id})
                text.innerText = textarea.value
                document.onkeydown = null
                setStatuses(false)
            }
        }, 1)
    }

    return(
        <div className={'information__item'}>
            <div className={'information__title flex-property-set_between'}>
                <h3>{title}</h3>
                <button disabled={editStatus} onClick={e => editInfo(e, changeText, text, textId, setStatus, setEditStatus)}>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </div>
            {status ? <textarea ref={textareaRef} maxLength={100}/> : <p ref={textRef} className={'text'}>{text}</p>}
        </div>
    )
})