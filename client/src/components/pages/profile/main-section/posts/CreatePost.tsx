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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const id = useAppSelector(state => state.profileReducer.id)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(addUserPost(res)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const addNewPost = async () => {
        await addPost({ text: textareaRef.current?.value || '', id })
        setIsCreatingPost(false)
    }

    const handleTextareaInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    return(
        <div className={`${styles['posts__create-post']} mb-24 relative`}>
            <textarea className={'w-full px-2.5 py-4 text-black text-sm'} minLength={20} maxLength={500} ref={textareaRef} onInput={handleTextareaInput} />
            <div className={`flex absolute`}>
                <button className={'text-xs py-1 px-3'} onClick={() => addNewPost()}>Submit</button>
                <hr className={'w-px h-9'} />
                <button className={'text-xs py-1 px-3'} onClick={() => setIsCreatingPost(false)}>Cancel</button>
            </div>
        </div>
    )
}

export const CreatePost = React.memo(CreatePostComponent)
