import styles from "../../../../styles/Profile.module.scss"

type PropsType = {
    followers: string[]
    following: string[]
}
export function Subscriptions({ followers, following }: PropsType) {
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