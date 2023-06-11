import React from "react"
import styles from "@/styles/Profile.module.scss"

interface IProps {
    followers: React.JSX.Element[]
    following: React.JSX.Element[]
}

const SubscriptionsComponent: React.FC<IProps> = ({ followers, following }) => {
     return(
        <div className={`${styles.subscriptions} h-fit rounded-lg p-2.5`}>
            <div className={`${styles['subscriptions__followers']} mb-12`}>
                <h3 className={'text-lg font-medium'}>Followers {followers.length}</h3>
                <hr/>
                <div className={`${styles['subscriptions__content']} inline-flex flex-wrap gap-2.5 mt-2`}>
                    {followers}
                </div>
            </div>
            <div className={`${styles['subscriptions__following']} mb-12`}>
                <h3 className={'text-lg font-medium'}>Following {following.length}</h3>
                <hr/>
                <div className={`${styles['subscriptions__content']} inline-flex flex-wrap gap-2.5 mt-2`}>
                    {following}
                </div>
            </div>
        </div>
    )
}

export const Subscriptions = React.memo(SubscriptionsComponent)
