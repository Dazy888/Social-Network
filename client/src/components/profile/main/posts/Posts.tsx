import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { getPostsElements } from "@/pages/profile"
import { PostsCreation } from "@/components/profile/main/posts/PostsCreation"
import { NewPostBtn } from "@/components/profile/main/posts/NewPostBtn"

const PostsComponent = () => {
    const [isPostCreation, setIsPostCreation] = useState(false)

    const id = useAppSelector(state => state.profileReducer.id)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, avatar, name, false)

    return(
        <div className={styles.posts}>
            { postsElements }
            { isPostCreation ? <PostsCreation setNewPostStatus={setIsPostCreation} /> : <NewPostBtn setNewPostStatus={setIsPostCreation} /> }
        </div>
    )
}

export const Posts = React.memo(PostsComponent)
