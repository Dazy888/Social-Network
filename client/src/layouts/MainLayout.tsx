import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { useDispatch } from "react-redux"
import { useQuery } from "react-query"
import { LayoutProps } from "@/models/layouts.models"
// Styles
import styles from '@/styles/MainLayout.module.scss'
// Components
import { Header } from "@/components/layouts/main/header/Header"
import { Loader } from "@/components/common/Loader"
// Service
import { AuthService } from "@/services/auth.service"
// Cookie functions
import { createCookie } from "@/layouts/AuthLayout"
// Store
import { resetUser, setUser } from "@/store/reducers/ProfileSlice"
import { setSettingData } from "@/store/reducers/SettingsSlice"

export async function successfulLogout(router: any, dispatch: any) {
    createCookie('refreshToken', '', -1)
    createCookie('accessToken', '', -1)
    await router.push('/auth/sign-in')
    dispatch(resetUser())
}

const MainLayoutComponent: React.FC<LayoutProps> = ({ children, title }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { refetch:refresh, isLoading } = useQuery('refresh', () => AuthService.refresh(),
        {
            onSuccess(res) {
                createCookie('accessToken', res.accessToken, 15 / (24 * 60))
                dispatch(setUser({ ...res.user, posts: res.user.posts, subscriptions: res.user.subscriptions }))
                dispatch(setSettingData({ email: res.user.email, isEmailActivated: res.user.isEmailActivated }))
            },
            onError: () => successfulLogout(router, dispatch),
            // retry: false
        })

    useEffect(() => {
        setInterval(() => refresh(), 900000)
    }, [])

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div id={styles['app-wrapper']} className={'grid'}>
                <Header />
                <main className={'min-h-screen flex justify-center items-center'}>
                    {!isLoading ? children : <Loader /> }
                </main>
            </div>
        </>
    )
}

export const MainLayout = React.memo(MainLayoutComponent)
