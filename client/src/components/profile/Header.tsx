import React from "react"
import { useRouter } from "next/router"
// Styles
import styles from "@/styles/Profile.module.scss"
// React Query
import { useMutation } from "react-query"
// Interfaces
import { SubscriptionProps } from "@/interfaces/profile.interfaces"
import { IUserData } from "@/interfaces/users.interfaces"
// HTTP Service
import { ProfileService } from "@/services/profile.service"
// Components
import { SubscriptionBtn } from "@/components/profile/SubscriptionBtn"

interface IProps {
    userId?: string
    user?: IUserData
    setUser?: any
    avatar: string
    banner: string
    location: string
    name: string
    forView?: boolean
    subscribed?: boolean
    openedUserId?: string
    followers?: string[]
}

const HeaderComponent: React.FC<IProps> = ({ user, name, avatar, banner, location, forView, subscribed, openedUserId = '', followers = [''], setUser, userId= '' }) => {
    const router = useRouter()

    const { isLoading:isFollowing, mutateAsync:follow } = useMutation('follow', (data: SubscriptionProps) => ProfileService.follow(data.authorizedUserId, data.openedUserId), {
        onSuccess() {
            setUser({ ...user, followers: [...followers, userId] })
        },
    })

    const { isLoading:isUnfollowing, mutateAsync:unfollow } = useMutation('unfollow', (data: SubscriptionProps) => ProfileService.unfollow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            user?.followers.splice(user?.followers.indexOf(userId), 1)
            setUser({ ...user, followers: user?.followers })
        }
    })

    return(
        <div className={`${styles['header']} w-full h-fit relative`}>
            <img alt={'Banner'} className={`${styles['banner']} w-full`} src={banner}/>
            <div className={`${styles['user']} absolute z-10 text-center text-white`}>
                <img alt={'Avatar'} className={'rounded-full'} src={avatar}/>
                <h2 className={'text-2xl font-medium mb-1.5'}>{name}</h2>
                <p className={'opacity-90'}>{location}</p>
            </div>
            <div className={styles['tile']}></div>
            {forView &&
                <div className={`${styles['subscription']} absolute`}>
                    {subscribed
                        ? <SubscriptionBtn text={'Unfollow'} isRequesting={isUnfollowing} className={styles['unfollow']} authorizedUserId={userId} openedUserId={openedUserId} subscriptionFunc={unfollow}/>
                        : <SubscriptionBtn text={'Follow'} isRequesting={isFollowing} className={styles['follow']} authorizedUserId={userId} openedUserId={openedUserId} subscriptionFunc={follow}/>
                    }
                </div>
            }
            {!forView &&
                <button onClick={() => router.push('settings/profile')} className={`${styles['settings-btn']} absolute text-3xl`}>
                    <i className={'fa-solid fa-gear'}/>
                </button>
            }
        </div>
    )
}

export const Header = React.memo(HeaderComponent)
