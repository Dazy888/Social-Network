import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { getPostsElements } from "@/pages/profile/index"
import { v4 } from "uuid"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Hooks
import { useAppSelector } from "@/hooks/redux"
// Models
import { SubscriptionParams } from "@/models/profile.models"
import { PublicUserData } from "@/models/users.models"
// Styles
import styles from "@/styles/Profile.module.scss"
// Components
import { MainLayout } from "@/layouts/MainLayout"
import { ProfileIntro } from "@/components/pages/profile/main-section/profile-intro/ProfileIntro"
import { Subscriptions } from "@/components/pages/profile/main-section/subscriptions/Subscriptions"
import { UserAvatar } from "@/components/pages/profile/main-section/subscriptions/UserAvatar"
import { SubscriptionBtn } from "@/components/pages/profile/header-section/SubscriptionBtn"
import { HeaderSection } from "@/components/pages/profile/header-section/HeaderSection"
import { Loader } from "@/components/common/Loader"
// Services
import { UsersService } from "@/services/users.service"
import { FollowService } from "@/services/follow.service"

const UserProfile = () => {
    const router = useRouter()
    const [openedUser, setOpenedUser] = useState<PublicUserData>({
        banner: '',
        avatar: '',
        name: '',
        location: '',
        aboutMe: '',
        hobbies: '',
        skills: '',
        posts: [],
        subscriptions: {
            followings: [],
            followers: []
        }
    })

    const openedUserId: any = router.query.userId
    const initialUserId = useAppSelector(state => state.profileReducer.id)

    const { refetch:getUser, isLoading:isLoadingUser } = useQuery('get user', () => UsersService.getUser(openedUserId), {
        onSuccess: (res) => setOpenedUser(res),
        onError: (err: string) => notify(err, 'error'),
        enabled: false
    })

    useEffect(() => {
        if (openedUserId) getUser()
    }, [openedUserId])

    const followingUsers = openedUser?.subscriptions.followings.map((id: string) => <UserAvatar key={v4()} id={id} />)
    const followersUsers = openedUser?.subscriptions.followers.map((id: string) => <UserAvatar key={v4()} id={id} />)

    const { isLoading:isFollowing, mutateAsync:follow } = useMutation('follow', (data: SubscriptionParams) => FollowService.follow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            setOpenedUser((prevState) => {
                return {
                    ...prevState,
                    subscriptions: {
                        followers: [...openedUser.subscriptions.followers, initialUserId],
                        followings: openedUser.subscriptions.followings
                    }
                }
            })
        },
        onError: (err: string): any => notify(err, 'error')
    })

    const { isLoading:isUnfollowing, mutateAsync:unfollow } = useMutation('unfollow', (data: SubscriptionParams) => FollowService.unfollow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            setOpenedUser((prevState) => {
                return {
                    ...prevState,
                    subscriptions: {
                        followers: openedUser.subscriptions.followers.filter((id: string) => id !== initialUserId),
                        followings: openedUser.subscriptions.followings
                    }
                }
            })
        },
        onError: (err: string): any => notify(err, 'error')
    })

    const subscriptionBtn = openedUser?.subscriptions.followers.includes(initialUserId)
        ?   <SubscriptionBtn text={'Unfollow'} isRequesting={isUnfollowing} className={styles.unfollow} authorizedUserId={initialUserId}
                             openedUserId={openedUserId} subscriptionFunc={unfollow}
            />
        :   <SubscriptionBtn text={'Follow'} isRequesting={isFollowing} className={styles.follow} authorizedUserId={initialUserId}
                             openedUserId={openedUserId} subscriptionFunc={follow}
            />

    return(
        <MainLayout title={`${openedUser?.name || 'User'} profile`}>
            {openedUser.name
                ?   <div id={styles.profile} className={'my-24 mx-auto'}>
                        <HeaderSection banner={openedUser.banner} avatar={openedUser.avatar} name={openedUser.name} location={openedUser.location} subscriptionBtn={subscriptionBtn} forView={true} />
                        <section id={styles.main} className={'grid gap-12 mt-14 text-white'}>
                            <ProfileIntro forView={true} aboutMe={openedUser.aboutMe} hobbies={openedUser.hobbies} skills={openedUser.skills}/>
                            <div className={styles.posts}>{getPostsElements(openedUser.posts, openedUser.avatar, openedUser.name, true)}</div>
                            <Subscriptions followers={followersUsers} following={followingUsers}/>
                        </section>
                    </div>
                :   <Loader />
            }
        </MainLayout>
    )
}

export default React.memo(UserProfile)
