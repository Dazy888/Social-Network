import React from "react"
import styles from "@/styles/Profile.module.scss"
import { useAppSelector } from "@/hooks/redux"
import { v4 } from "uuid"
// Components
import { ProfileIntro } from "@/components/pages/profile/main-section/profile-intro/ProfileIntro"
import { Subscriptions } from "@/components/pages/profile/main-section/subscriptions/Subscriptions"
import { UserAvatar } from "@/components/pages/profile/main-section/subscriptions/UserAvatar"
import { Posts } from "@/components/pages/profile/main-section/posts/Posts"

const MainSectionComponent = () => {
    const id = useAppSelector(state => state.profileReducer.id)
    const aboutMe = useAppSelector(state => state.profileReducer.aboutMe)
    const skills = useAppSelector(state => state.profileReducer.skills)
    const hobbies = useAppSelector(state => state.profileReducer.hobbies)
    const followers = useAppSelector(state => state.profileReducer.subscriptions.followers)
    const following = useAppSelector(state => state.profileReducer.subscriptions.followings)

    const followingUsers = following.map((userId) => <UserAvatar key={v4()} id={userId}/>)
    const followersUsers = followers.map((userId) => <UserAvatar key={v4()} id={userId}/>)

    return(
        <section id={styles.main} className={'grid gap-12 mt-14 text-white'}>
            <ProfileIntro {...{ id, aboutMe, hobbies, skills }} />
            <Posts />
            <Subscriptions following={followingUsers} followers={followersUsers}/>
        </section>
    )
}

export const MainSection = React.memo(MainSectionComponent)
