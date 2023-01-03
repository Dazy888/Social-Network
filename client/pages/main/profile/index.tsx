import Head from "next/head"
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
import {useMutation, useQuery} from "react-query"
// Store
import {
    getAboutMe,
    getAvatar,
    getBanner,
    getFollowers, getFollowing,
    getHobbies,
    getId,
    getLocation,
    getName,
    getPosts,
    getSkills
} from "../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../store/reducers/profile/profile-reducer"
// Service
import { ProfileService } from "../../../services/profile-service"
// Styles
import styles from '../../../styles/Profile.module.scss'
import User from "./components/User";
import {func} from "prop-types";

export default function Index() {
    const dispatch = useDispatch()
    const textareaPostRef: any = useRef()
    const [newPostStatus, setNewPostStatus] = useState<boolean>(false)
    const [currentUserId, setId] = useState<string>('')
    const [currentUserAvatar, setAvatar] = useState<string>('')

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

    const followingUsers: any = useMemo(() => [...following].reverse().map(async (id, pos) => {
        await getUser(id, pos)
    }), [following])

    const followersUsers: any = useMemo(() => [...followers].reverse().map(async (id, pos) => {
        await getUser(id, pos)
    }), [followers])

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.addNewPost(response.data))
            }
        }
    )

    async function getUser(id: string, key: number) {
        setId(id)
        await refetch
        return <User key={key} avatar={currentUserAvatar}/>
    }

    const { refetch } = useQuery('get avatar', () => ProfileService.getAvatar(currentUserId), {enabled: false, onSuccess: (res) => setAvatar(res.data)})

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
                    <div className={styles['followers']}>
                        <h3 className={styles['title']}>Followers {followers.length}</h3>
                        <hr/>
                        {followersUsers}
                    </div>
                    <div className={styles['following']}>
                        <h3 className={styles['title']}>Following {following.length}</h3>
                        <hr/>
                        {followingUsers}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}