import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
// Components
import { Header } from "@/components/profile/Header"
import { Information } from "@/components/profile/Information"
import { Subscriptions } from "@/components/profile/Subscriptions"
import { User } from "@/components/profile/User"
// React Query
import { useQuery } from "react-query"
// Interfaces
import { UserDataI } from "@/interfaces/users-interfaces"
import { AxiosResponse } from "axios"
// HTTP Service
import { UsersService } from "@/services/users-service"
// Styles
import styles from "@/styles/Profile.module.scss"
// Store
import { getId } from "@/store/reducers/profile/profile-selectors"
// Functions
import { editInfo, getPostsElements } from "@/pages/main/profile/index"

const UserProfile = () => {
    const router = useRouter()
    const [user, setUser] = useState<UserDataI>({banner: '', avatar: '', aboutMe: '', hobbies: '', name: '', location: '', skills: '', followers: [''], following: [''], posts: []})

    const openedUserId: any = router.query.userId
    const initialUserId = useSelector(getId)

    const { refetch } = useQuery('get user', () => UsersService.getUser(openedUserId), {
        onSuccess(res) {
            setUser(res.data)
        },
        enabled: false
    })

    useEffect(() => {
        if (openedUserId) refetch()
    }, [openedUserId, refetch])

    const postsElements = getPostsElements(user.posts, '', user.avatar, user.name, true)
    const followingUsers: any = user.following.map((id, pos) => <User key={pos} id={id}/>)
    const followersUsers: any = user.followers.map((id, pos) => <User key={pos} id={id}/>)

    return(
        <MainPage>
            <Head>
                <title>{user.name} profile</title>
            </Head>
            <div id={styles['profile']} className={'my-24 mx-auto'}>
                <Header id={initialUserId} setUser={setUser} user={user} followers={user.followers} openedUserId={openedUserId} subscribed={user.followers.includes(initialUserId)} forView={true} avatar={user.avatar} banner={user.banner} location={user.location} name={user.name}/>
                <div className={`${styles['main']} grid gap-12 mt-14 text-white`}>
                    <Information editInfo={editInfo} forView={true} aboutMe={user.aboutMe} hobbies={user.hobbies} skills={user.skills}/>
                    <div id={styles['posts']}>
                        {postsElements}
                    </div>
                    <Subscriptions followers={followersUsers} following={followingUsers}/>
                </div>
            </div>
        </MainPage>
    )
}

export default React.memo(UserProfile)