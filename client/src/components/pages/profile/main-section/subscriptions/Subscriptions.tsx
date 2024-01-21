import React from "react"
import styles from "@/styles/Profile.module.scss"
import { SubscriptionsList } from "@/components/pages/profile/main-section/subscriptions/SubscriptionsList"

interface Props {
    followers: React.JSX.Element[]
    following: React.JSX.Element[]
}

const SubscriptionsComponent: React.FC<Props> = ({ followers, following }) => (
    <article className={`${styles.subscriptions} h-fit p-2.5`}>
        <SubscriptionsList title={'Followers'} users={followers} />
        <SubscriptionsList title={'Followings'} users={following} />
    </article>
)

export const Subscriptions = React.memo(SubscriptionsComponent)
