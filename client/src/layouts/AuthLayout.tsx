import React, { useEffect, useRef, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from '@/styles/Auth.module.scss'
import {AuthForm, notify} from "@/components/pages/auth/form/AuthForm"
// Models
import { IAuthForm } from "@/models/auth.models"
import ReCAPTCHA from "react-google-recaptcha"
import { LayoutProps } from "@/models/layouts.models"
// Components
import { AuthInput } from "@/components/pages/auth/form/AuthInput"
import { SubmitBtn } from "@/components/pages/auth/form/SubmitBtn"
import { PassRequirements } from "@/components/common/PassRequirements"
import { NavLink } from "@/components/common/NavLink"
import Link from "next/link";
import {Title} from "@/components/pages/auth/title/Title";

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
    const reRef: any = useRef<ReCAPTCHA>()

    const [captchaToken, setCaptchaToken] = useState<string | null>('')

    const { register, handleSubmit, watch, formState: { errors, touchedFields } } = useForm<IAuthForm>({ mode: 'onChange' })
    const currentPass =  watch('pass')

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')

        const requestData = { userName: data.userName, pass: data.pass }
        if (title === 'up') {
            signAction(requestData)
        } else {
            signAction(requestData)
        }
    }

    useEffect(() => {
        if (getCookie('refreshToken')) router.push('/profile')
    }, [])

    return(
        <>
            <Head>
                <title>Sign {title}</title>
            </Head>
            <div className={`${styles['auth-wrapper']} flex-center w-full min-h-screen`}>
                <div className={`${styles['auth']} rounded-lg p-8`}>
                    <Title title={title} />
                    <AuthForm {...{ signAction, isLoading, title }} />
                </div>
            </div>
        </>
    )
}
export const AuthPage = React.memo(AuthLayout)
