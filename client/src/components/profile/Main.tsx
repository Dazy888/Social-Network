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
import { getAboutMe, getAvatar, getFollowers, getFollowing, getHobbies, getName, getPosts, getSkills } from "@/store/reducers/profile/profile-selectors"

interface PropsI {
    id: string
}

const MainComponent: React.FC<PropsI> = ({ id }) => {
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const followers = useSelector(getFollowers)
    const following = useSelector(getFollowing)

    const avatar = useSelector(getAvatar)
    const name = useSelector(getName)
    const posts = useSelector(getPosts)
    const postsElements = getPostsElements(posts, id, avatar, name, false)

    const followingUsers: any = following.map((id, pos) => <User key={pos} id={id}/>)
    const followersUsers: any = followers.map(async (id, pos) => <User key={pos} id={id}/>)

    return(
        <div className={`${styles['main']} grid gap-12 mt-14 text-white`}>
            <Information id={id} editInfo={editInfo} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
            <Posts posts={postsElements} id={id}/>
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </div>
    )
}

export const Main = React.memo(MainComponent)