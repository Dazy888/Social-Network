import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
// Styles
import styles from "@/styles/Profile.module.scss"
// React Query
import { useMutation } from "react-query"
// Interfaces
import { TextPropsI} from "@/interfaces/profile-interfaces"
// Service
import { ProfileService } from "@/services/profile-service"
// Store
import { profileActions } from "@/store/reducers/profile/profile-reducer"

interface PropsI {
    id: string
    posts: any
}

const PostsComponent: React.FC<PropsI> = ({ id, posts }) => {
    const dispatch = useDispatch()
    const textareaPostRef: any = useRef()
    const [newPostStatus, setNewPostStatus] = useState(false)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextPropsI) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.addNewPost(response.data))
            }
        }
    )

    async function addNewPost(setStatus: (status: boolean) => void) {
        await addPost({text: textareaPostRef.current.value, id})
        setStatus(false)
    }

    return(
        <div className={styles['posts']}>
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