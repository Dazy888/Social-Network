import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { getPostsElements } from "@/pages/profile"
import { CreatePost } from "@/components/pages/profile/main-section/posts/CreatePost"
import { CreatePostBtn } from "@/components/pages/profile/main-section/posts/CreatePostBtn"

const PostsComponent = () => {
    const [isCreatingPost, setIsCreatingPost] = useState(false)

    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, avatar, name, false)

    return(
        <article className={styles.posts}>
            { postsElements }
            { isCreatingPost ? <CreatePost setIsCreatingPost={setIsCreatingPost} /> : <CreatePostBtn setIsCreatingPost={setIsCreatingPost} /> }
        </article>
    )
}

export const Posts = React.memo(PostsComponent)
