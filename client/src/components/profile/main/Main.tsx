import React from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { v4 } from "uuid"
// Components
import { Information } from "@/components/profile/main/infornation/Information"
import { Subscriptions } from "@/components/profile/main/subscriptions/Subscriptions"
import { User } from "@/components/profile/main/User"
import { Posts } from "@/components/profile/main/posts/Posts"

const MainComponent = () => {
    const id = useAppSelector(state => state.profileReducer.id)
    const aboutMe = useAppSelector(state => state.profileReducer.aboutMe)
    const skills = useAppSelector(state => state.profileReducer.skills)
    const hobbies = useAppSelector(state => state.profileReducer.hobbies)
    const followers = useAppSelector(state => state.profileReducer.followers)
    const following = useAppSelector(state => state.profileReducer.following)

    const followingUsers = following.map((userId) => <User key={v4()} id={userId}/>)
    const followersUsers = followers.map((userId) => <User key={v4()} id={userId}/>)

    return(
        <div className={`${styles.main} grid gap-12 mt-14 text-white`}>
            <Information id={id} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
            <Posts />
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </div>
    )
}

export const Main = React.memo(MainComponent)
