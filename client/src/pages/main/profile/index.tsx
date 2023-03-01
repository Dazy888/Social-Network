import React, { useRef, useState } from "react"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
// Components
import { Post } from "@/components/profile/Post"
import { Header } from "@/components/profile/Header"
import { Information } from "@/components/profile/Information"
import { Subscriptions } from "@/components/profile/Subscriptions"
import { User } from "@/components/profile/User"
// Layout
import { MainPage } from "@/layouts/MainPage-Layout"
// Interfaces
import { ChangeInfoFunc, EditInfoFunc, PostI, TextPropsI } from "@/interfaces/profile-interfaces"
// React Query
import { useMutation } from "react-query"
// Store
import { getAboutMe, getAvatar, getBanner, getFollowers, getFollowing, getHobbies, getId, getLocation, getName, getPosts, getSkills } from "@/store/reducers/profile/profile-selectors"
import { profileActions } from "@/store/reducers/profile/profile-reducer"
// HTTP Service
import { ProfileService } from "@/services/profile-service"
// Styles
import styles from '@/styles/Profile.module.scss'

export const getPostsElements = (posts: PostI[], id: string, avatar: string, name: string, forView: boolean) => {
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
export const editInfo: EditInfoFunc = (event: any, changeText: ChangeInfoFunc, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textareaRef: any, id: string) => {
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

    const { mutateAsync:addPost } = useMutation('add post', (data: TextPropsI) => ProfileService.addPost(data.text, data.id),
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
        <MainPage>
            <Head>
                <title>Profile</title>
            </Head>
            {id
                ? <div className={styles['profile']}>
                    <Header location={location} avatar={avatar} name={name} banner={banner}/>
                    <div className={styles['main']}>
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
        </MainPage>
    )
}

export default React.memo(Index)