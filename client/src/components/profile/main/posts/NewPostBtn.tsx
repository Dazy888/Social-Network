import React from "react"
import styles from "@/styles/Profile.module.scss"
import { PropsCreationProps } from "@/components/profile/main/posts/PostsCreation"

const NewPostBtnComponent: React.FC<PropsCreationProps> = ({ setNewPostStatus }) => (
    <div className={`${styles['posts__new-post']} w-fit mx-auto`}>
        <h3 className={'text-lg font-medium text-center mt-2.5'}>Add New Post</h3>
        <button className={'block mx-auto text-5xl'} onClick={() => setNewPostStatus(true)}>
            <i className={'fa-regular fa-square-plus'}/>
        </button>
    </div>
)

export const NewPostBtn = React.memo(NewPostBtnComponent)
