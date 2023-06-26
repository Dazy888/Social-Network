import React from "react"
import { SubscriptionFunc } from "@/models/profile.models"

interface IProps {
    subscriptionFunc: SubscriptionFunc
    authorizedUserId: string
    openedUserId: string
    isRequesting: boolean
    className: string
    text: string
}

const SubscriptionBtnComponent: React.FC<IProps> = ({ subscriptionFunc, openedUserId, authorizedUserId, isRequesting, className, text }) => (
    <button className={`${className} text-sm tracking-wide duration-200 font-semibold rounded-md text-white`} disabled={isRequesting} onClick={() => subscriptionFunc({ authorizedUserId, openedUserId })}>
        {text}
    </button>
)

export const SubscriptionBtn = React.memo(SubscriptionBtnComponent)