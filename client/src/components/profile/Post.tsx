import React from "react"
// React Query
import { useMutation } from "react-query"
// Store
import { deletePost } from "@/store/reducers/ProfileSlice"
// Styles
import styles from '@/styles/Profile.module.scss'
// Models
import { DeletePostProps } from "@/models/profile"
// HTTP Service
import { ProfileService } from "@/services/profile.service"
// Hooks
import { useAppDispatch } from "@/hooks/redux"

interface IProps {
    avatar: string
    name: string
    date: string | undefined
    text: string
    postId: string
    userId?: string
    forView?: boolean

}

const PostComponent: React.FC<IProps> = ({ avatar, name, date, text, postId, userId = '', forView }) => {
    const dispatch = useAppDispatch()

    const { mutateAsync } = useMutation('delete post', (data: DeletePostProps) => ProfileService.deletePost(data.userId, data.userId),
        {
            onSuccess(response) {
                dispatch(deletePost(response.data))
            }
        }
    )

    return(
        <div className={`${styles.post} w-full h-fit p-6 rounded-lg mb-7`}>
            <div className={`${styles['post__header']} flex justify-between mb-5`}>
                <div className={`${styles['post__user']} w-fit text-left flex justify-between items-center`}>
                    <img className={'w-10 h-10 mr-3 rounded-full'} alt={'avatar'} src={avatar}/>
                    <div className={styles['post__information']}>
                        <h3 className={'text-lg font-medium'}>{name}</h3>
                        <p className={'text-sm'}>{date}</p>
                    </div>
                </div>
                {!forView &&
                    <button className={'text-2xl'} onClick={() => mutateAsync({postId, userId})}>
                        <i className={'fa-solid fa-trash'}/>
                    </button>
                }
            </div>
            <p className={'font-medium mb-5'}>{text}</p>
            <hr className={'w-full h-px'}/>
        </div>
    )
}

export const Post = React.memo(PostComponent)
