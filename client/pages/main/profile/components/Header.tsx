import { useRouter } from "next/router"
// Styles
import styles from "../../../../styles/Profile.module.scss"
// React Query
import { useMutation } from "react-query"
// Types
import { SubscriptionProps } from "../types/profile-types"
// Service
import { ProfileService } from "../../../../services/profile-service"
// Redux
import {useDispatch, useSelector} from "react-redux"
// Store
import {getFollowers, getId} from "../../../../store/reducers/profile/profile-selectors"
import {profileActions} from "../../../../store/reducers/profile/profile-reducer";
import {UserData} from "../../users/types/users-types";

type PropsType = {
    user?: UserData
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
export function Header({ user, name, avatar, banner, location, forView = false, subscribed = false, openedUserId = '', followers = [''], setUser }: PropsType) {
    const router = useRouter()
    const dispatch = useDispatch()

    const id = useSelector(getId)
    // const authorizedUserFollowers = useSelector(getFollowers)

    const { isLoading:isFollowing, mutateAsync:follow } = useMutation('follow', (data: SubscriptionProps) => ProfileService.follow(data.authorizedUserId, data.openedUserId), {
        onSuccess: () => {
            // dispatch(profileActions.addFollowing(openedUserId))
            setUser({...user, followers: [...followers, id]})
        }
    })

    const { isLoading:isUnfollowing, mutateAsync:unfollow } = useMutation('unfollow', (data: SubscriptionProps) => ProfileService.unfollow(data.authorizedUserId, data.openedUserId), {
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