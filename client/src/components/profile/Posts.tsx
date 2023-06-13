import React, { useRef, useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { useMutation } from "react-query"
import { IPost, TextProps } from "@/models/profile"
import { ProfileService } from "@/services/profile.service"
import { addUserPost } from "@/store/reducers/ProfileSlice"
import { useAppDispatch } from "@/hooks/redux"
import {notify} from "@/pages/auth/sign-in";

interface IProps {
    id: string
    posts: IPost[] | any
}

const PostsComponent: React.FC<IProps> = ({ id, posts }) => {
    const dispatch = useAppDispatch()
    const textareaPostRef: any = useRef()
    const [newPostStatus, setNewPostStatus] = useState(false)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(res) {
                dispatch(addUserPost(res))
                notify('Post was created successfully', 'success')
            },
            onError: (): any => notify('Post was not created, try again', 'error')
        }
    )

    const addNewPost = async (setStatus: (status: boolean) => void) => {
        await addPost({ text: textareaPostRef.current.value, id })
        setStatus(false)
    }

    return(
        <div className={styles.posts}>
            { posts }
            { newPostStatus
                ?   <div className={`${styles['posts__creation']} mb-24`}>
                        <textarea className={'w-full h-24 rounded-lg p-2.5'} maxLength={300} ref={textareaPostRef}/>
                        <div className={`flex justify-between mt-5 mx-auto`}>
                            <button className={`${styles['submit']} h-9 rounded-2xl font-medium duration-300`} onClick={() => addNewPost(setNewPostStatus)}>Submit</button>
                            <button className={`${styles['cancel']} h-9 rounded-2xl font-medium duration-300`} onClick={() => setNewPostStatus(false)}>Cancel</button>
                        </div>
                    </div>
                :   <div className={`${styles['posts__new-post']} w-fit mx-auto`}>
                        <h3 className={'text-lg font-medium text-center mt-2.5'}>Add New Post</h3>
                        <button className={'block mx-auto text-5xl'} onClick={() => setNewPostStatus(true)}>
                            <i className={'fa-regular fa-square-plus'}/>
                        </button>
                    </div>
            }
        </div>
    )
}

export const Posts = React.memo(PostsComponent)
