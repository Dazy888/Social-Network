import React, { useRef } from "react"
import styles from "@/styles/Profile.module.scss"
import { useMutation } from "react-query"
import { TextProps } from "@/models/profile.models"
import { ProfileService } from "@/services/profile.service"
import { addUserPost } from "@/store/reducers/ProfileSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { notify } from "@/components/pages/auth/AuthForm"

export interface PropsCreationProps {
    setIsCreatingPost: (status: boolean) => void
}

const CreatePostComponent: React.FC<PropsCreationProps> = ({ setIsCreatingPost }) => {
    const dispatch = useAppDispatch()
    const textareaPostRef: any = useRef()

    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(addUserPost(res)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const addNewPost = async () => {
        await addPost({ text: textareaPostRef.current.value, id })
        setIsCreatingPost(false)
    }

    return(
        <div className={`${styles['posts__create-post']} mb-24`}>
            <textarea className={'w-full h-24 rounded-lg p-2.5 text-black text-sm'} minLength={20} maxLength={500} ref={textareaPostRef}/>
            <div className={`flex justify-between mt-5 mx-auto`}>
                <button className={styles['submit']} onClick={() => addNewPost()}>Submit</button>
                <button className={styles['cancel']} onClick={() => setIsCreatingPost(false)}>Cancel</button>
            </div>
        </div>
    )
}

export const CreatePost = React.memo(CreatePostComponent)
