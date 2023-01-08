import React, {useEffect, useMemo, useState} from "react"
import Head from "next/head"
import { useRouter } from "next/router"
// Layout
import { MainLayout } from "../../../layouts/Main-Layout"
// Components
import { Header } from "./components/Header"
import { Information } from "./components/Information"
import Post from "./components/Post"
import { Subscriptions } from "./components/Subscriptions"
import { User } from "./components/User"
import { useSelector } from "react-redux"
// React Query
import { useQuery } from "react-query"
// Typification
import { UserData } from "../users/types/users-types"
import { AxiosResponse } from "axios"
// HTTP Service
import { UsersService } from "../../../services/users-service"
// Styles
// @ts-ignore
import styles from "../../../styles/Profile.module.scss"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
export default React.memo(function UserProfile() {
    const router = useRouter()
    const [user, setUser] = useState<UserData>({banner: '', avatar: '', aboutMe: '', hobbies: '', name: '', location: '', skills: '', followers: [], following: [], posts: []})

    const openedUserId: any = router.query.userId
    const initialUserId = useSelector(getId)

    const { refetch } = useQuery('get user', () => UsersService.getUser(openedUserId), {
        onSuccess(res: AxiosResponse<UserData>) {
            setUser(res.data)
        },
        enabled: false
    })

    useEffect(() => {
        if (openedUserId) refetch()
    }, [openedUserId, refetch])

    const postsElements = useMemo(() => user.posts.reverse().map((p, pos) => <Post forView={true} key={pos} userId={openedUserId} id={p.postId} avatar={user.avatar} name={user.name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [openedUserId, user.avatar, user.name, user.posts])
    const followingUsers: any = user.following.map((id, pos) => <User key={pos} id={id}/>)
    const followersUsers: any = user.followers.map((id, pos) => <User key={pos} id={id}/>)

    return(
        <MainLayout>
            <Head>
                <title>{user.name}</title>
            </Head>
            <div className={styles['profile']}>
                <Header setUser={setUser} user={user} followers={user.followers} openedUserId={openedUserId} subscribed={user.followers.includes(initialUserId)} forView={true} avatar={user.avatar} banner={user.banner} location={user.location} name={user.name}/>
                <div className={`${styles['main']} flex-between`}>
                    <Information forView={true} aboutMe={user.aboutMe} hobbies={user.hobbies} skills={user.skills}/>
                    <div className={styles['posts']}>
                        {postsElements}
                    </div>
                    <Subscriptions followers={followersUsers} following={followingUsers}/>
                </div>
            </div>
        </MainLayout>
    )
})