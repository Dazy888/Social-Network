import React from "react"
import { useMutation } from "react-query"
import { deletePost } from "@/store/reducers/ProfileSlice"
import styles from '@/styles/Profile.module.scss'
import { DeletePostParams } from "@/models/profile.models"
import { ProfileService } from "@/services/profile.service"
import { useAppDispatch } from "@/hooks/redux"
import { notify } from "@/components/pages/auth/form/AuthForm"

interface Props {
    avatar: string | null
    name: string | null
    createdAt: string | undefined
    text: string
    postId: string
    forView?: boolean
}

const PostComponent: React.FC<Props> = ({ avatar, name, createdAt, text, postId, forView }) => {
    const dispatch = useAppDispatch()

    const { mutateAsync } = useMutation('delete post', (data: DeletePostParams) => ProfileService.deletePost(data.postId),
        {
            onSuccess: (res): any => dispatch(deletePost(res)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div className={`${styles.post} w-full h-fit p-6 mb-7`}>
            <div className={`${styles['post__header']} flex justify-between mb-5 relative`}>
                <div className={`${styles['post__user']} w-fit text-left flex justify-between items-center`}>
                    <img className={'w-10 h-10 mr-3 rounded-full object-cover'} alt={'avatar'} src={avatar || 'https://storage.googleapis.com/social-network_dazy/profiles/avatars/default-avatar.webp'}/>
                    <div className={styles['post__information']}>
                        <h3 className={'text-base font-medium'}>{name}</h3>
                        <p className={'text-xs'}>{createdAt}</p>
                    </div>
                </div>
                {!forView &&
                    <button className={'absolute text-base duration-200 text-red'} onClick={() => mutateAsync({ postId })}>
                        <i className={'fa-solid fa-trash'} />
                    </button>
                }
            </div>
            <p className={'text-sm whitespace-pre-line mb-5'}>{text}</p>
            <hr className={'w-full h-px'}/>
        </div>
    )
}

export const Post = React.memo(PostComponent)
