import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { getPostsElements } from "@/pages/profile/index"
import { v4 } from "uuid"
import { notify } from "@/components/auth/AuthForm"
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
// Models
import { SubscriptionProps } from "@/models/profile.models"
// Styles
import styles from "@/styles/Profile.module.scss"
// Components
import { MainLayout } from "@/layouts/MainLayout"
import { Information } from "@/components/profile/main/infornation/Information"
import { Subscriptions } from "@/components/profile/main/subscriptions/Subscriptions"
import { User } from "@/components/profile/main/User"
import { SubscriptionBtn } from "@/components/profile/header/SubscriptionBtn"
import { UserInfo } from "@/components/profile/header/UserInfo"
// Services
import { ProfileService } from "@/services/profile.service"
import { UsersService } from "@/services/users.service"

const UserProfile = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [openedUser, setOpenedUser] = useState<any>()

    // const openedUser = useAppSelector(state => state.usersReducer.openedUser)

    const openedUserId: any = router.query.userId
    const initialUserId = useAppSelector(state => state.profileReducer.id)

    const { refetch:getUser, isLoading:isLoadingUser } = useQuery('get user', () => UsersService.getUser(openedUserId), {
        onSuccess: (res) => {
            setOpenedUser(res)
            // dispatch(setOpenedUser(res))
        },
        onError: (err: string) => notify(err, 'error'),
        enabled: false
    })

    useEffect(() => {
        if (openedUserId) getUser()
    }, [openedUserId])

    const followingUsers = openedUser?.following.map((id: string) => <User key={v4()} id={id}/>)
    const followersUsers = openedUser?.followers.map((id: string) => <User key={v4()} id={id}/>)

    const { isLoading:isFollowing, mutateAsync:follow } = useMutation('follow', (data: SubscriptionProps) => ProfileService.follow(data.authorizedUserId, data.openedUserId), {
        onSuccess: (): any => setOpenedUser({ ...openedUser, followers: [...openedUser.followers, initialUserId] }),
        onError: (err: string): any => notify(err, 'error')
    })

    const { isLoading:isUnfollowing, mutateAsync:unfollow } = useMutation('unfollow', (data: SubscriptionProps) => ProfileService.unfollow(data.authorizedUserId, data.openedUserId), {
        onSuccess: (): any => setOpenedUser({ ...openedUser, followers: openedUser.followers.filter((id: string) => id !== initialUserId) }),
        onError: (err: string): any => notify(err, 'error')
    })

    return(
        <MainLayout title={`${openedUser?.name || 'User'} profile`}>
            <div id={styles.profile} className={'my-24 mx-auto'}>
                {openedUser &&
                    <>
                        <div className={`${styles.header} w-full h-fit relative`}>
                            <img alt={'Banner'} className={`${styles.banner} w-full`} src={openedUser.banner} />
                            <UserInfo name={openedUser.name} location={openedUser.location} avatar={openedUser.avatar} />
                            <div className={styles.tile}></div>
                            <div className={`${styles.subscription} absolute`}>
                                {openedUser.followers.includes(initialUserId)
                                    ? <SubscriptionBtn text={'Unfollow'} isRequesting={isUnfollowing} className={styles.unfollow} authorizedUserId={initialUserId} openedUserId={openedUserId} subscriptionFunc={unfollow}/>
                                    : <SubscriptionBtn text={'Follow'} isRequesting={isFollowing} className={styles.follow} authorizedUserId={initialUserId} openedUserId={openedUserId} subscriptionFunc={follow}/>
                                }
                            </div>
                        </div>
                        <div className={`${styles.main} grid gap-12 mt-14 text-white`}>
                            <Information forView={true} aboutMe={openedUser.aboutMe} hobbies={openedUser.hobbies} skills={openedUser.skills}/>
                            <div className={styles.posts}>{getPostsElements(openedUser.posts, openedUser.avatar, openedUser.name, true)}</div>
                            <Subscriptions followers={followersUsers} following={followingUsers}/>
                        </div>
                    </>
                }
            </div>
        </MainLayout>
    )
}

export default React.memo(UserProfile)
