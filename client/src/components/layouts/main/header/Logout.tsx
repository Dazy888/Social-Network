import React from "react"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { AuthService } from "@/services/auth.service"
import { successfulLogout } from "@/layouts/MainLayout"
import { notify } from "@/components/pages/auth/form/AuthForm"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import styles from "@/styles/MainLayout.module.scss"

const LogoutComponent = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const avatar = useAppSelector(state => state.profileReducer.profile.avatar)

    const { refetch:logout } = useQuery('logout', () => AuthService.signOut(),
        {
            onSuccess: () => successfulLogout(router, dispatch),
            onError: () => notify('Logout has failed, try again', 'error'),
            enabled: false
        }
    )

    return(
        <div className={`${styles.logout} flex items-center cursor-pointer overflow-hidden relative duration-300`}>
            <img alt={'Avatar'} src={avatar || 'https://storage.googleapis.com/social-network_dazy/profiles/avatars/default-avatar.webp'} className={'w-12 h-12 rounded-full object-cover'}/>
            <button className={'text-lg absolute text-white duration-300'} onClick={() => logout()}>Logout</button>
        </div>
    )
}

export const Logout = React.memo(LogoutComponent)
