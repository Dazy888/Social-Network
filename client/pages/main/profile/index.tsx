import { useMemo, useRef, useState } from "react"
// Components
import Post from "./components/Post"
import { Header } from "./components/Header"
import { Information } from "./components/Information"
// Layout
import { MainLayout } from "../../../layouts/Main-Layout"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Types
import { TextProps } from "./types/profile-types"
import { AxiosResponse } from "axios"
// React Query
import { useMutation } from "react-query"
// Next
import Head from "next/head"
// Store
import { getAboutMe, getAvatar, getBanner, getHobbies, getId, getLocation, getName, getPosts, getSkills } from "../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
// Service
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

    return(
        <MainLayout>
            <Head>
                <title>Profile</title>
            </Head>
            <div className={styles['profile']}>
                <Header location={location} avatar={avatar} name={name} banner={banner}/>
                <div className={`${styles['main']} flex-between`}>
                    <Information aboutMe={aboutMe} hobbies={hobbies} skills={skills}/>
                    <div className={styles['posts']}>
                        {postsElements}
                        {newPostStatus
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
                    <div className={styles['subscriptions']}>
                        <h3 className={styles['title']}>Subscriptions 100</h3>
                        <hr/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}