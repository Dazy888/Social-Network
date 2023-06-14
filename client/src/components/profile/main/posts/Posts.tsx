import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { getPostsElements } from "@/pages/profile"
import { PostsCreation } from "@/components/profile/main/posts/PostsCreation"
import { NewPostBtn } from "@/components/profile/main/posts/NewPostBtn"

const PostsComponent = () => {
    const [newPostStatus, setNewPostStatus] = useState(false)

    const id = useAppSelector(state => state.profileReducer.id)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, id, avatar, name, false)

    return(
        <div className={styles.posts}>
            { postsElements }
            { newPostStatus ? <PostsCreation setNewPostStatus={setNewPostStatus} /> : <NewPostBtn setNewPostStatus={setNewPostStatus} /> }
        </div>
    )
}

export const Posts = React.memo(PostsComponent)
