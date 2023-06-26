import React from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    title: 'Followers' | 'Following'
    users: React.JSX.Element[]
}

const SubscriptionsListComponent: React.FC<Props> = ({ users, title }) => (
    <div className={`${styles['subscriptions__list']} mb-12`}>
        <h3 className={'text-lg font-medium'}>{title} {users.length}</h3>
        <hr/>
        <div className={`${styles['subscriptions__content']} inline-flex flex-wrap gap-2.5 mt-2`}>{users}</div>
    </div>
)

export const SubscriptionsList = React.memo(SubscriptionsListComponent)
