import Head from "next/head"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// Components
import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { Information } from "./components/Information"
import { Subscriptions } from "./components/Subscriptions"
import { User } from "./components/User"
// Layout
import { MainLayout } from "../../../layouts/Main-Layout"
// Typification
import {ChangeInfo, EditInfo, PostType, TextProps} from "./interfaces/interfaces"
import { AxiosResponse } from "axios"
// React Query
import { useMutation } from "react-query"
// Store
import {getAboutMe, getAvatar, getBanner, getFollowers, getFollowing, getHobbies, getId, getLocation, getName, getPosts, getSkills } from "../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
// HTTP Service
import { ProfileService } from "../../../services/profile-service"
// Styles
// @ts-ignore
import styles from '../../../styles/Profile.module.scss'
export const getPostsElements = (posts: PostType[], id: string, avatar: string, name: string, forView: boolean) => {
    return [...posts].reverse().map((p, pos) => {
        const date = Math.abs(new Date().getTime() - new Date(p.date).getTime())
        let time: string | undefined

        if (Math.round(date / 1000 / 60) === 1) {
            time = `1 minute ago`
        } else if (Math.round(date / 1000 / 60) < 60) {
            time = `${Math.round(date / 1000 / 60)} minutes ago`
        } else if (Math.round(date / 1000 / 60 / 60) === 1) {
            time = `1 hour ago`
        } else if (Math.round(date / 1000 / 60 / 60) < 24) {
            time = `${Math.round(date / 1000 / 60 / 60)} hours ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24) === 1) {
            time = `1 day ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24) < 31) {
            time = `${Math.round(date / 1000 / 60 / 60 / 24)} days ago`
        }

        return <Post forView={forView} key={pos} userId={id} id={p.postId} avatar={avatar} name={name} date={time} text={p.text}/>
    })
}
export const editInfo: EditInfo = (event: any, changeText: ChangeInfo, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textareaRef: any, id: string) => {
    function setStatuses(status: boolean) {
        setEditStatus(status)
        setStatus(status)
    }

    setStatuses(true)

    setTimeout(() => {
        const textarea = textareaRef.current
        textarea.value = value
        textarea.onblur = async () => {
            await changeText({text: textarea.value, id})
            text.innerText = textarea.value
            document.onkeydown = null
            setStatuses(false)
        }
    }, 1)
}
const Index = () => {
    const dispatch = useDispatch()
    const textareaPostRef: any = useRef()
    const [newPostStatus, setNewPostStatus] = useState<boolean>(false)

    const id = useSelector(getId)
    const posts = useSelector(getPosts)
    const avatar = useSelector(getAvatar)
    const banner = useSelector(getBanner)
    const location = useSelector(getLocation)
    const name = useSelector(getName)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const followers = useSelector(getFollowers)
    const following = useSelector(getFollowing)

    const postsElements = getPostsElements(posts, id, avatar, name, false)

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.addNewPost(response.data))
            }
        }
    )
    async function addNewPost(setStatus: (status: boolean) => void) {
        await addPost({text: textareaPostRef.current.value, id})
        setStatus(false)
    }

    const followingUsers: any = following.map((id, pos) => <User key={pos} id={id}/>)
    const followersUsers: any = followers.map(async (id, pos) => <User key={pos} id={id}/>)

    return(
        <MainLayout>
            <Head>
                <title>Profile</title>
            </Head>
            {id
                ? <div className={styles['profile']}>
                    <Header location={location} avatar={avatar} name={name} banner={banner}/>
                    <div className={`${styles['main']} flex-between`}>
                        <Information id={id} editInfo={editInfo} aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
                        <div className={styles['posts']}>
                            { postsElements }
                            { newPostStatus
                                ? <div className={styles['posts__create']}>
                                    <textarea maxLength={300} ref={textareaPostRef}/>
                                    <div className={`${styles['buttons']} flex-between`}>
                                        <button className={styles['submit']} onClick={(e) => addNewPost(setNewPostStatus)}>Submit</button>
                                        <button className={styles['cancel']} onClick={() => setNewPostStatus(false)}>Cancel</button>
                                    </div>
                                </div>
                                : <div className={styles['posts__new-post']}>
                                    <h3 className={styles['title']}>Add New Post</h3>
                                    <button onClick={() => setNewPostStatus(true)}>
                                        <i className="fa-regular fa-square-plus"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <Subscriptions following={followingUsers} followers={followersUsers}/>
                    </div>
                </div>
                : null
            }
        </MainLayout>
    )
}
export default React.memo(Index)