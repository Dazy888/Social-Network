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
// Store
import { getAboutMe, getAvatar, getFollowers, getFollowing, getHobbies, getName, getPosts, getSkills } from "@/store/reducers/profile/profile.selectors"

interface IProps {
    userId: string
}

const MainComponent: React.FC<IProps> = ({ userId }) => {
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const followers = useSelector(getFollowers)
    const following = useSelector(getFollowing)
    const avatar = useSelector(getAvatar)
    const name = useSelector(getName)
    const posts = useSelector(getPosts)
    const postsElements = getPostsElements(posts, userId, avatar, name, false)

    const followingUsers: any = following.map((userId, pos) => <User key={pos} userId={userId}/>)
    const followersUsers: any = followers.map((userId, pos) => <User key={pos} userId={userId}/>)

    return(
        <div className={`${styles['main']} grid gap-12 mt-14 text-white`}>
            <Information userId={userId} editInfo={editInfo} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
            <Posts posts={postsElements} userId={userId}/>
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </div>
    )
}

export const Main = React.memo(MainComponent)
