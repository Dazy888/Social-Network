import Head from "next/head"
import { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// Components
import Post from "./components/Post"
import { Header } from "./components/Header"
import { Information } from "./components/Information"
import { Subscriptions } from "./components/Subscriptions"
import { User } from "./components/User"
// Layout
import { MainLayout } from "../../../layouts/Main-Layout"
// Typification
import { TextProps } from "./types/profile-types"
import { AxiosResponse } from "axios"
// React Query
import { useMutation } from "react-query"
// Store
import {getAboutMe, getAvatar, getBanner, getFollowers, getFollowing, getHobbies, getId, getLocation, getName, getPosts, getSkills } from "../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
// HTTP Service
import { ProfileService } from "../../../services/profile-service"
// Styles
import styles from '../../../styles/Profile.module.scss'
export default function Index() {
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

    const postsElements = useMemo(() => [...posts].reverse().map((p, pos) => <Post key={pos} userId={id} id={p.postId} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
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
                        <Information aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
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