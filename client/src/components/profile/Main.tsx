import React from "react"
import styles from "@/styles/Profile.module.scss"
import { getPostsElements } from "@/pages/main/profile"
import { useAppSelector } from "@/hooks/redux"
import { v4 } from "uuid"
// Components
import { Information } from "@/components/profile/Information"
import { Subscriptions } from "@/components/profile/Subscriptions"
import { User } from "@/components/profile/User"
import { Posts } from "@/components/profile/Posts"

const MainComponent = () => {
    const id = useAppSelector(state => state.profileReducer.id)
    const aboutMe = useAppSelector(state => state.profileReducer.aboutMe)
    const skills = useAppSelector(state => state.profileReducer.skills)
    const hobbies = useAppSelector(state => state.profileReducer.hobbies)
    const followers = useAppSelector(state => state.profileReducer.followers)
    const following = useAppSelector(state => state.profileReducer.following)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, id, avatar, name, false)

    const followingUsers = following.map((userId, pos) => <User key={v4()} id={id}/>)
    const followersUsers = followers.map((userId, pos) => <User key={v4()} id={id}/>)

    return(
        <div className={`${styles.main} grid gap-12 mt-14 text-white`}>
            <Information id={id} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
            <Posts posts={postsElements} id={id}/>
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </div>
    )
}

export const Main = React.memo(MainComponent)
