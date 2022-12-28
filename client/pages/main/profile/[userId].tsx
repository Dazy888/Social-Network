import React, {useEffect, useMemo, useState} from "react"
// Next
import Head from "next/head"
import { useRouter } from "next/router"
// Layouts
import {MainLayout} from "../../../layouts/Main-Layout"
// Components
import { Header } from "./components/Header"
import { Information } from "./components/Information"
import Post from "./components/Post"
// React Query
import { useQuery } from "react-query"
// Types
import { UserData } from "../users/types/users-types"
// Service
import { UsersService } from "../../../services/users-service"
// Styles
import styles from "../../../styles/Profile.module.scss"

export default React.memo(function UserProfile() {
    const [user, setUser] = useState<UserData>({banner: '', avatar: '', aboutMe: '', hobbies: '', name: '', location: '', skills: '', posts: []})
    const router = useRouter()
    let id: any = router.query.userId

    const { refetch } = useQuery('get user', () => UsersService.getUser(id), {
        onSuccess(res) {
            // console.log(res)
            setUser(res.data)
        },
        enabled: false
    })

    useEffect(() => {
        setTimeout(() => {
            refetch()
        }, 100)
    }, [])

    const postsElements = useMemo(() => [...user.posts].reverse().map((p, pos) => <Post forView={true} key={pos} userId={id} id={p.postId} avatar={user.avatar} name={user.name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [user.posts])

    return(
        <MainLayout>
            <Head>
                <title>{user.name}</title>
            </Head>
            <div className={styles['profile']}>
                <Header forView={true} avatar={user.avatar} banner={user.banner} location={user.location} name={user.name}/>
                <div className={`${styles['main']} flex-between`}>
                    <Information forView={true} aboutMe={user.aboutMe} hobbies={user.hobbies} skills={user.skills}/>
                    <div className={styles['posts']}>
                        {postsElements}
                    </div>
                    <div className={styles['subscriptions']}>
                        <h3 className={styles['title']}>Subscriptions 100</h3>
                        <hr/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
})