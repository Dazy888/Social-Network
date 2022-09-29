import React from "react";
import {ChangeInfo} from "../../login/types/login-types"

type PropsType = {
    editStatus: boolean
    setEditStatus: (status: boolean) => void
    status: boolean
    textId: string
    id: number
    text: string
    setStatus: (status: boolean) => void
    changeText: (text: string, id: number) => void
}

export default React.memo(function InformationItem({status, text, changeText, setStatus, id, textId, setEditStatus, editStatus}: PropsType) {
    function editInfo(event: any, changeText: ChangeInfo, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void) {
        setEditStatus(true)
        setStatus(true)
        const block = event.target.closest('.information__item')
        const text = block.querySelector(`#${textId}`)
        let textarea: any

        setTimeout(() => {
            textarea = block.querySelector('textarea')
            textarea.value = value
            textarea.onblur = sendText
        }, 1)

        document.onkeydown = (e) => {
            if (e.code === 'Enter') sendText()
        }

        function sendText() {
            changeText(textarea.value, id)
            text.innerText = textarea.value
            document.onkeydown = null
            setEditStatus(true)
            setStatus(true)
        }
    }

    return(
        <div className={'information__item'}>
            <div className={'information__title flex-property-set_between'}>
                <p className={'information__title'}>About Me:</p>
                <button disabled={editStatus} onClick={e => editInfo(e, changeText, text, textId, setStatus, setEditStatus)} className={'information__btn'}>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </div>
            {status
                ? <textarea maxLength={100}/>
                : <p className={'text'} id={'aboutMe'}>{text}</p>
            }
        </div>
    )
})