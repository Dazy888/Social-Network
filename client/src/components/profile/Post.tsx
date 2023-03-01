import React from "react"
import { useDispatch } from "react-redux"
// React Query
import { useMutation } from "react-query"
// Store
import { ProfileService } from "@/services/profile-service"
import { profileActions } from "@/store/reducers/profile/profile-reducer"
// Styles
import styles from '@/styles/Profile.module.scss'
// Interfaces
import { DeletePostPropsI } from "@/interfaces/profile-interfaces"

interface Props {
    avatar: string
    name: string
    date: string | undefined
    text: string
    id: string
    userId?: string
    forView?: boolean

}

const PostComponent: React.FC<Props> = ({ avatar, name, date, text, id, userId = '', forView = false }) => {
    const dispatch = useDispatch()

    const { mutateAsync } = useMutation('delete post', (data: DeletePostPropsI) => ProfileService.deletePost(data.id, data.userId),
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
                    <img alt={'avatar'} src={avatar}/>
                    <div className={styles['post__information']}>
                        <h3 className={styles['title']}>{name}</h3>
                        <p className={styles['text']}>{date}</p>
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
}

export const Post = React.memo(PostComponent)