import React from "react"
import styles from "@/styles/Profile.module.scss"
import { PropsCreationProps } from "@/components/profile/main/posts/PostsCreation"

const NewPostBtnComponent: React.FC<PropsCreationProps> = ({ setNewPostStatus }) => (
    <div className={`${styles['posts__new-post']} w-fit mx-auto`}>
        <button className={'block mx-auto text-4xl'} onClick={() => setNewPostStatus(true)}>
            <i className={'fa-regular fa-square-plus'} />
        </button>
    </div>
)

export const NewPostBtn = React.memo(NewPostBtnComponent)
