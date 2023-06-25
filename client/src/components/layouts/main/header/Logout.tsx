import React from "react"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { AuthService } from "@/services/auth.service"
import { successfulLogout } from "@/layouts/MainLayout"
import { notify } from "@/components/auth/AuthForm"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import styles from "@/styles/MainLayout.module.scss"

const LogoutComponent = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const avatar = useAppSelector(state => state.profileReducer.avatar)

    const { refetch:logout } = useQuery('logout', () => AuthService.logout(),
        {
            onSuccess: () => successfulLogout(router, dispatch),
            onError: () => notify('Logout has failed, try again', 'error'),
            enabled: false
        }
    )

    return(
        <div className={`${styles['header__logout']} flex items-center cursor-pointer overflow-hidden relative duration-300`}>
            <img alt={'Avatar'} src={avatar || 'https://storage.googleapis.com/social-network_dazy/default-avatar.webp'} className={'rounded-full w-12 h-12'}/>
            <button className={'text-lg absolute text-white duration-300'} onClick={() => logout()}>Logout</button>
        </div>
    )
}

export const Logout = React.memo(LogoutComponent)
