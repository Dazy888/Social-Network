import React from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    title: string
    users: React.JSX.Element[]
}

const SubscriptionsListComponent: React.FC<Props> = ({ users, title }) => (
    <div className={`${styles['subscriptions__list']} mb-12`}>
        <h3 className={'text-base'}>
            <span className={'font-medium'}>{users.length}</span> {title}
        </h3>
        <hr className={'mt-1'}/>
        <div className={`${styles['subscriptions__users']} grid grid-cols-5 gap-2.5 mt-2`}>{users}</div>
    </div>
)

export const SubscriptionsList = React.memo(SubscriptionsListComponent)
