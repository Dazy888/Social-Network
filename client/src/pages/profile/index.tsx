import React from "react"
import { MainPage } from "@/layouts/MainPageLayout"
import { IPost } from "@/models/profile"
import { useAppSelector } from "@/hooks/redux"
import { v4 } from 'uuid'
import styles from '@/styles/Profile.module.scss'
// Components
import { Post } from "@/components/profile/main/posts/Post"
import { Header } from "@/components/profile/header/Header"
import { Main } from "@/components/profile/main/Main"

export const getPostsElements = (posts: IPost[], id: string, avatar: string, name: string, forView: boolean) => {
    return [...posts].reverse().map(({ postId, id, text, createdAt}) => {
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

        return <Post forView={forView} key={v4()} id={id} postId={postId} avatar={avatar} name={name} createdAt={time} text={text}/>
    })
}

const Profile = () => {
    const id = useAppSelector(state => state.profileReducer.id)

    return(
        <MainPage title={'Profile'}>
            {id &&
                <div id={styles.profile} className={'my-24 mx-auto'}>
                    <Header />
                    <Main />
                </div>
            }
        </MainPage>
    )
}

export default React.memo(Profile)
