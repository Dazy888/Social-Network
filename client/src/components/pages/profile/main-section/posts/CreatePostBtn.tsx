import React from "react"
import { PropsCreationProps } from "@/components/pages/profile/main-section/posts/CreatePost"
import styles from '@/styles/Profile.module.scss'

const NewPostBtnComponent: React.FC<PropsCreationProps> = ({ setIsCreatingPost }) => (
    <div className={'w-fit mx-auto cursor-pointer'}>
        <button className={`block mx-auto text-4xl duration-300 cursor-pointer ${styles['posts__create-post-btn']}`} onClick={() => setIsCreatingPost(true)}>
            <i className={'fa-regular fa-square-plus'} />
        </button>
    </div>
)

export const CreatePostBtn = React.memo(NewPostBtnComponent)
