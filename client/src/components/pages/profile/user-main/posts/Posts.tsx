import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { getPostsElements } from "@/pages/profile"
import { CreatePost } from "@/components/pages/profile/user-main/posts/CreatePost"
import { NewPostBtn } from "@/components/pages/profile/user-main/posts/NewPostBtn"

const PostsComponent = () => {
    const [isCreatingPost, setIsCreatingPost] = useState(false)

    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, avatar, name, false)

    return(
        <div className={styles.posts}>
            { postsElements }
            { isCreatingPost ? <CreatePost setIsCreatingPost={setIsCreatingPost} /> : <NewPostBtn setIsCreatingPost={setIsCreatingPost} /> }
        </div>
    )
}

export const Posts = React.memo(PostsComponent)
