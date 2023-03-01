import React from "react"
import styles from "../../styles/Profile.module.scss"

interface Props {
    followers: string[]
    following: string[]
}

const SubscriptionsComponent: React.FC<Props> = ({ followers, following }) => {
     return(
        <div className={styles['subscriptions']}>
            <div className={styles['followers']}>
                <h3 className={styles['title']}>Followers {followers.length}</h3>
                <hr/>
                <div className={styles['content']}>
                    {followers}
                </div>
            </div>
            <div className={styles['following']}>
                <h3 className={styles['title']}>Following {following.length}</h3>
                <hr/>
                <div className={styles['content']}>
                    {following}
                </div>
            </div>
        </div>
    )
}

export const Subscriptions = React.memo(SubscriptionsComponent)