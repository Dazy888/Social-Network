import React from "react"
import "../styles/Modal.css"

type PropsType = {
    setModelStatus: (status: boolean) => void
}

export function Modal({setModelStatus}: PropsType) {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__close-btn">
                    <button onClick={() => {setModelStatus(false)}}>X</button>
                </div>
                <div className={'modal__text'}>
                    <p>We sent you an email for verification</p>
                </div>
            </div>
        </div>
    )
}