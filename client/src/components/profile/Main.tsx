import React from "react"
import { useSelector } from "react-redux"
// Styles
import styles from "@/styles/Profile.module.scss"
// Components
import { Information } from "@/components/profile/Information"
import { Subscriptions } from "@/components/profile/Subscriptions"
import { User } from "@/components/profile/User"
import { Posts } from "@/components/profile/Posts"
// Functions
import { editInfo, getPostsElements } from "@/pages/main/profile"
import {useAppSelector} from "@/hooks/redux";
// Store

interface IProps {
    userId: string
}

const MainComponent: React.FC<IProps> = ({ userId }) => {
    const aboutMe = useAppSelector(state => state.profileReducer.aboutMe)
    const skills = useAppSelector(state => state.profileReducer.skills)
    const hobbies = useAppSelector(state => state.profileReducer.hobbies)
    const followers = useAppSelector(state => state.profileReducer.followers)
    const following = useAppSelector(state => state.profileReducer.following)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const posts = useAppSelector(state => state.profileReducer.posts)
    const postsElements = getPostsElements(posts, userId, avatar, name, false)

    const followingUsers: any = following.map((userId, pos) => <User key={pos} userId={userId}/>)
    const followersUsers: any = followers.map((userId, pos) => <User key={pos} userId={userId}/>)

    return(
        <div className={`${styles.main} grid gap-12 mt-14 text-white`}>
            <Information userId={userId} editInfo={editInfo} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
            <Posts posts={postsElements} userId={userId}/>
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </div>
    )
}

export const Main = React.memo(MainComponent)
