import React, { ReactNode } from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    subscriptionBtn: ReactNode
}

const SubscriptionsComponent: React.FC<Props> = ({ subscriptionBtn }) => <div className={`${styles.subscription} absolute`}>{subscriptionBtn}</div>
export const Subscriptions = React.memo(SubscriptionsComponent)
