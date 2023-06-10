import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { LayoutProps } from "@/models/layouts"
import { NavLink } from "@/components/navigation/NavLink"
import styles from '@/styles/Authorization.module.scss'
import Head from "next/head";

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts: any = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const createCookie = (name: string, value: string, days: number) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`
}

const AuthPageLayout: React.FC<LayoutProps> = ({ children, title }) => {
    const router = useRouter()

    useEffect(() => {
        if (getCookie('refreshToken')) router.push('/main/profile')
    }, [])

    return(
        <>
            <Head>
                <title>Sign {title}</title>
            </Head>
            <div className={`${styles['auth-wrapper']} flex justify-center items-center w-full min-h-screen`}>
                <div className={`${styles['auth']} flex justify-center items-center rounded-r-xl`}>
                    <div className={`${styles['auth__actions']} h-full w-2/12`}>
                        <NavLink path={'/auth/sign-in'} activeClass={'active'} iconClass={'fa-solid fa-arrow-right-to-bracket'}/>
                        <NavLink path={'/auth/sign-up'} activeClass={'active'} iconClass={'fa-solid fa-address-card'}/>
                    </div>
                    <div className={`${styles['auth__content']} flex justify-center w-10/12 relative`}>
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}
export const AuthPage = React.memo(AuthPageLayout)
