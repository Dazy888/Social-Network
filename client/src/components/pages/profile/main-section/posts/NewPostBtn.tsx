import React from "react"
import { PropsCreationProps } from "@/components/pages/profile/main-section/posts/CreatePost"

const NewPostBtnComponent: React.FC<PropsCreationProps> = ({ setIsCreatingPost }) => (
    <div className={'w-fit mx-auto'}>
        <button className={'block mx-auto text-4xl'} onClick={() => setIsCreatingPost(true)}>
            <i className={'fa-regular fa-square-plus'} />
        </button>
    </div>
)

export const NewPostBtn = React.memo(NewPostBtnComponent)
