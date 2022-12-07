import { useMemo, useRef, useState } from "react"
// Components
import Post from "./components/Post"
import InformationItem from "./components/Information-Item"
import Modal from "./components/Modal"
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
// CSS
import styles from '../../../styles/Profile.module.scss'

export default function Index() {
    const dispatch = useDispatch()
    const textareaPostRef: any = useRef()

    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [newPostStatus, setNewPostStatus] = useState<boolean>(false)
    const [editStatus, setEditStatus] = useState<boolean>(false)

    const id = useSelector(getId)
    const posts = useSelector(getPosts)
    const avatar = useSelector(getAvatar)
    const banner = useSelector(getBanner)
    const name = useSelector(getName)
    const location = useSelector(getLocation)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)

    const postsElements = useMemo(() => [...posts].reverse().map((p, pos) => <Post key={pos} userId={id} id={p.id} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

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

    const { mutateAsync:changeAboutMe } = useMutation('change about me', (data: TextProps) => ProfileService.changeAboutMe(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setAboutMe(response.data))
            }
        }
    )

    const { mutateAsync:changeHobbies } = useMutation('change hobbies', (data: TextProps) => ProfileService.changeHobbies(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setHobbies(response.data))
            }
        }
    )

    const { mutateAsync:changeSkills } = useMutation('change skills', (data: TextProps) => ProfileService.changeSkills(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setSkills(response.data))
            }
        }
    )

    return(
        <MainLayout>
            <Head>
                <title>Profile</title>
            </Head>
            <div>
                {modalStatus ? <Modal setModalStatus={setModalStatus}/> : null}
                <div className={styles['profile']}>
                    <div className={styles['header']}>
                        <img alt={'Banner'} className={styles['header__banner']} src={banner}/>
                        <div className={styles['header__user']}>
                            <img alt={'Avatar'} className={styles['header__avatar']} src={avatar}/>
                            <p className={styles['header__name']}>{name}</p>
                            <p className={styles['header__location']}>{location}</p>
                        </div>
                        <div className={styles['header__tile']}></div>
                        <button onClick={() => setModalStatus(true)} className={styles['header__settings']}>
                            <i className="fa-solid fa-gear"></i>
                        </button>
                    </div>
                    <div className={`${styles['main']} flex-between`}>
                        <div className={styles['information']}>
                            <h3 className={styles['title']}>Profile Intro</h3>
                            <hr/>
                            <InformationItem title={'About Me:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe}/>
                            <InformationItem title={'Skills:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'hobbies'} text={hobbies} changeText={changeHobbies}/>
                            <InformationItem title={'Hobbies:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'skills'} text={skills} changeText={changeSkills}/>
                        </div>
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
            </div>
        </MainLayout>
    )
}