import React from "react"

interface PropsI {
    subscriptionFunc: any
    authorizedUserId: string
    openedUserId: string
    isRequesting: boolean
    className: string
    text: string
}

const SubscriptionBtnComponent: React.FC<PropsI> = ({ subscriptionFunc, openedUserId, authorizedUserId, isRequesting, className, text }) => {
    return <button className={`${className} text-sm tracking-wide font-semibold rounded-md`} disabled={isRequesting} onClick={() => subscriptionFunc({ authorizedUserId, openedUserId })}>{text}</button>
}

export const SubscriptionBtn = React.memo(SubscriptionBtnComponent)