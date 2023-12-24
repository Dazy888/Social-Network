import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import styles from '@/styles/Auth.module.scss'
import { AuthForm } from "@/components/pages/auth/form/AuthForm"
// Models
import { IAuthForm } from "@/models/auth.models"
import { LayoutProps } from "@/models/layouts.models"
// Components
import { Title } from "@/components/pages/auth/title/Title"

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts: any = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const createCookie = (name: string, value: string, days: number) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`
}

interface Props extends LayoutProps {
    isLoading: boolean
    signAction: (data: IAuthForm) => void
}

const AuthLayout: React.FC<Props> = ({ title, signAction, isLoading}) => {
    const router = useRouter()

    useEffect(() => {
        if (getCookie('refreshToken')) router.push('/profile')
    }, [])

    return(
        <>
            <Head>
                <title>Sign {title}</title>
            </Head>
            <div className={`${styles['auth-wrapper']} flex justify-center py-72 w-full min-h-screen`}>
                <div className={`${styles['auth']} rounded-lg p-8`}>
                    <Title title={title} />
                    <AuthForm {...{ signAction, isLoading, title }} />
                </div>
            </div>
        </>
    )
}
export const AuthPage = React.memo(AuthLayout)
