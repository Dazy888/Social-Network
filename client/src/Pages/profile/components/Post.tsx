import React from "react"
import {DeletePost} from "../types/Profile-Types"

type PropsType = {
    avatar: string
    name: string
    date: number
    text: string
    id: number
    userId: number
    deletePost: DeletePost
}

export default React.memo(function Post({avatar, name, date, text, deletePost, id, userId}: PropsType) {
    let time

    if (Math.round(date / 1000 / 60) === 1) {
        time = `1 minute ago`
    } else if (Math.round(date / 1000 / 60) < 60) {
        time = `${Math.round(date / 1000 / 60)} minutes ago`
    } else if (Math.round(date / 1000 / 60 / 60) === 1) {
        time = `1 hour ago`
    } else if (Math.round(date / 1000 / 60 / 60) < 24) {
        time = `${Math.round(date / 1000 / 60 / 60)} hours ago`
    } else if (Math.round(date / 1000 / 60 / 60 / 24) === 1) {
        time = `1 day ago`
    } else if (Math.round(date / 1000 / 60 / 60 / 24) < 31) {
        time = `${Math.round(date / 1000 / 60 / 60 / 24)} days ago`
    }

    return(
        <div className={'post'}>
            <div className={'post__header flex-property-set_between'}>
                <div className={'post__user flex-property-set_between'}>
                    <img alt={'avatar'} src={avatar}/>
                    <div className={'post__information'}>
                        <h3 className={'title'}>{name}</h3>
                        <p className={'text'}>{time}</p>
                    </div>
                </div>
                <button className={'post__delete'} onClick={() => deletePost(id, userId)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <p className={'post__text'}>{text}</p>
            <hr className={'line'}/>
        </div>
    )
})