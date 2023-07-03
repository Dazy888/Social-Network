import React from "react"
import { IPost } from "@/models/profile.models"
import { useAppSelector } from "@/hooks/redux"
import { v4 } from 'uuid'
import styles from '@/styles/Profile.module.scss'
// Components
import { MainLayout } from "@/layouts/MainLayout"
import { Post } from "@/components/pages/profile/main-section/posts/Post"
import { HeaderSection } from "@/components/pages/profile/header-section/HeaderSection"
import { MainSection } from "@/components/pages/profile/main-section/MainSection"

export const getPostsElements = (posts: IPost[], avatar: string, name: string, forView: boolean) => {
    return [...posts].reverse().map(({ id, text, createdAt}) => {
        const date = Math.abs(new Date().getTime() - new Date(createdAt).getTime())
        const minutes = Math.round(date / 1000 / 60)
        const hours = Math.round(date / 1000 / 60 / 60)
        const days = Math.round(date / 1000 / 60 / 60 / 24)
        const months = Math.round(date / 1000 / 60 / 60 / 24 / 12)

        let time = ''

        if (minutes === 1) {
            time = '1 minute ago'
        } else if (minutes < 60) {
            time = `${minutes} minutes ago`;
        } else if (hours === 1) {
            time = '1 hour ago'
        } else if (hours < 24) {
            time = `${hours} hours ago`;
        } else if (days === 1) {
            time = '1 day ago'
        } else if (days < 31) {
            time = `${days} days ago`;
        } else if (months === 1) {
            time = '1 month ago'
        } else {
            time = `${months} months ago`
        }

        return <Post {...{ forView, avatar, name, text }} key={v4()} postId={id} createdAt={time} />
    })
}

const Profile = () => {
    const banner = useAppSelector(state => state.profileReducer.banner)
    const avatar = useAppSelector(state => state.profileReducer.avatar)
    const name = useAppSelector(state => state.profileReducer.name)
    const location = useAppSelector(state => state.profileReducer.location)

    return(
        <MainLayout title={'Profile'}>
            {banner &&
                <div id={styles.profile} className={'my-24 mx-auto'}>
                    <HeaderSection {...{ name, avatar, location, banner }} forView={false} />
                    <MainSection />
                </div>
            }
        </MainLayout>
    )
}

export default React.memo(Profile)
