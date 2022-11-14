import React from "react"
// React Query
import { useMutation } from "react-query"
// Service
import { ProfileService } from "../../../services/ProfileService"
// Redux
import { useDispatch } from "react-redux"
// Store
import { profileActions } from "../../../store/reducers/profile/profile-reducer"

type PropsType = {
    avatar: string
    name: string
    date: number
    text: string
    id: number
    userId: number
}

export default React.memo(function Post({ avatar, name, date, text, id, userId }: PropsType) {
    const dispatch = useDispatch()
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

    type DeletePostProps = {
        id: number
        userId: number
    }

    const { mutateAsync } = useMutation('delete post', (data: DeletePostProps) => ProfileService.deletePost(data.id, data.userId),
        {
            onSuccess(response) {
                dispatch(profileActions.deletePost(response.data))
            }
        }
    )

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
                <button onClick={() => mutateAsync({id, userId})}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <p className={'post__text'}>{text}</p>
            <hr className={'line'}/>
        </div>
    )
})