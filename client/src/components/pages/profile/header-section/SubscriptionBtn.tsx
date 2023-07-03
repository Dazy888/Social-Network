import React from "react"
import { SubscriptionFunc } from "@/models/profile.models"
import styles from '@/styles/Profile.module.scss'

interface Props {
    subscriptionFunc: SubscriptionFunc
    authorizedUserId: string
    openedUserId: string
    isRequesting: boolean
    className: string
    text: string
}

const SubscriptionBtnComponent: React.FC<Props> = ({ subscriptionFunc, openedUserId, authorizedUserId, isRequesting, className, text }) => {
    function clickListener(e: any) {
        const ripple = document.createElement('span')
        ripple.classList.add(styles['ripple-effect'])
        e.target.appendChild(ripple)

        const buttonRect = e.target.getBoundingClientRect();
        const rippleX = e.clientX - buttonRect.left
        const rippleY = e.clientY - buttonRect.top
        const radius = Math.max(e.target.clientWidth, e.target.clientHeight)

        ripple.style.width = `${radius}px`
        ripple.style.height = `${radius}px`
        ripple.style.left = `${rippleX - radius / 2}px`
        ripple.style.top = `${rippleY - radius / 2}px`

        setTimeout(() => ripple.remove(), 500)

        subscriptionFunc({ authorizedUserId, openedUserId })
    }

    return(
        <div className={`${styles.subscription} absolute`}>
            <button className={`${className} relative flex-center overflow-hidden text-sm tracking-wide duration-200 font-medium rounded-md text-white`} disabled={isRequesting} onClick={clickListener}>
                {text}
            </button>
        </div>
    )
}

export const SubscriptionBtn = React.memo(SubscriptionBtnComponent)
