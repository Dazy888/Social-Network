import React from "react"
import Image from "next/image"
// React Query
import { useMutation } from "react-query"
// Redux
import { useDispatch } from "react-redux"
// Store
import { ProfileService } from "../../../../services/profile-service"
import { profileActions } from "../../../../store/reducers/profile/profile-reducer"
// Styles
import styles from '../../../../styles/Profile.module.scss'

type PropsType = {
    avatar: string
    name: string
    date: number
    text: string
    id: string
    userId: string
    forView?: boolean
}

export default React.memo(function Post({ avatar, name, date, text, id, userId, forView = false }: PropsType) {
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
        id: string
        userId: string
    }

    const { mutateAsync } = useMutation('delete post', (data: DeletePostProps) => ProfileService.deletePost(data.id, data.userId),
        {
            onSuccess(response) {
                dispatch(profileActions.deletePost(response.data))
            }
        }
    )

    return(
        <div className={styles['post']}>
            <div className={`${styles['post__header']} flex-between`}>
                <div className={`${styles['post__user']} flex-between`}>
                    <Image alt={'avatar'} src={avatar}/>
                    <div className={styles['post__information']}>
                        <h3 className={styles['title']}>{name}</h3>
                        <p className={styles['text']}>{time}</p>
                    </div>
                </div>
                {!forView
                    ?   <button onClick={() => mutateAsync({id, userId})}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    :   null
                }
            </div>
            <p className={styles['post__text']}>{text}</p>
            <hr className={styles['line']}/>
        </div>
    )
})