import React from "react"
import { useRouter } from "next/router"
// Styles
import styles from "@/styles/Profile.module.scss"
// React Query
import { useMutation } from "react-query"
// Interfaces
import { SubscriptionPropsI } from "@/interfaces/profile-interfaces"
import { UserDataI } from "@/interfaces/users-interfaces"
// HTTP Service
import { ProfileService } from "@/services/profile-service"

interface Props {
    id?: string
    user?: UserDataI
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

const HeaderComponent: React.FC<Props> = ({ user, name, avatar, banner, location, forView = false, subscribed = false, openedUserId = '', followers = [''], setUser, id= '' }) => {
    const router = useRouter()

    const { isLoading:isFollowing, mutateAsync:follow } = useMutation('follow', (data: SubscriptionPropsI) => ProfileService.follow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            setUser({...user, followers: [...followers, id]})
        }
    })

    const { isLoading:isUnfollowing, mutateAsync:unfollow } = useMutation('unfollow', (data: SubscriptionPropsI) => ProfileService.unfollow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            user?.followers.splice(user?.followers.indexOf(id), 1)
            setUser({...user, followers: user?.followers})
        }
    })

    return(
        <div className={styles['header']}>
            <img alt={'Banner'} className={styles['header__banner']} src={banner}/>
            <div className={styles['header__user']}>
                <img alt={'Avatar'} className={styles['header__avatar']} src={avatar}/>
                <p className={styles['header__name']}>{name}</p>
                <p className={styles['header__location']}>{location}</p>
            </div>
            <div className={styles['header__tile']}></div>
            {forView
                ? <div className={styles['subscribe']}>
                    {subscribed
                        ? <button onClick={async () => await unfollow({authorizedUserId: id, openedUserId })} disabled={isUnfollowing} className={styles['unfollow']}>Unfollow</button>
                        : <button onClick={async () => await follow({authorizedUserId: id, openedUserId })} disabled={isFollowing} className={styles['follow']}>Follow</button>}
                  </div>
                : null
            }
            {!forView
                ?   <button onClick={() => router.push('settings/profile')} className={styles['header__settings']}>
                        <i className="fa-solid fa-gear"></i>
                    </button>
                :   null
            }
        </div>
    )
}

export const Header = React.memo(HeaderComponent)