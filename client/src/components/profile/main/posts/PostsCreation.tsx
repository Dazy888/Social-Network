import React, { useRef } from "react"
import styles from "@/styles/Profile.module.scss"
import { useMutation } from "react-query"
import { TextProps } from "@/models/profile.models"
import { ProfileService } from "@/services/profile.service"
import { addUserPost } from "@/store/reducers/ProfileSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notify } from "@/components/auth/AuthForm"

export interface PropsCreationProps {
    setNewPostStatus: (status: boolean) => void
}

const PostsCreationComponent: React.FC<PropsCreationProps> = ({ setNewPostStatus }) => {
    const dispatch = useAppDispatch()
    const textareaPostRef: any = useRef()

    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(addUserPost(res)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const addNewPost = async (setStatus: (status: boolean) => void) => {
        await addPost({ text: textareaPostRef.current.value, id })
        setStatus(false)
    }

    return(
        <div className={`${styles['posts__creation']} mb-24`}>
            <textarea className={'w-full h-24 rounded-lg p-2.5'} maxLength={300} ref={textareaPostRef}/>
            <div className={`flex justify-between mt-5 mx-auto`}>
                <button className={`${styles['submit']} h-9 rounded-2xl font-medium duration-300`} onClick={() => addNewPost(setNewPostStatus)}>Submit</button>
                <button className={`${styles['cancel']} h-9 rounded-2xl font-medium duration-300`} onClick={() => setNewPostStatus(false)}>Cancel</button>
            </div>
        </div>
    )
}

export const PostsCreation = React.memo(PostsCreationComponent)
