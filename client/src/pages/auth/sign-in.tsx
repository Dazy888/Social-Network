import React from "react"
import { NextRouter, useRouter } from "next/router"
import { useMutation } from "react-query"
import { AuthService } from "@/services/auth.service"
import { useAppDispatch } from "@/hooks/redux"
import {AuthForm, notify} from "@/components/pages/auth/form/AuthForm"
// Models
import {ExtendedUser, IAuthForm, Subscriptions, Tokens, User} from "@/models/auth.models"
import { IPost } from "@/models/profile.models"
import { AppDispatch } from "@/store/store"
// Components
import { AuthPage, createCookie } from "@/layouts/AuthLayout"
// Store
import { setUser } from "@/store/reducers/ProfileSlice"
import { setSettingData } from "@/store/reducers/SettingsSlice"

export const successfulEnter = (router: NextRouter, dispatch: AppDispatch, tokens: Tokens, userData: ExtendedUser, posts: IPost[] | [], subscriptions: Subscriptions) => {
    createCookie('refreshToken', tokens.refreshToken, 30)
    createCookie('accessToken', tokens.accessToken, 15 / (24 * 60))

    dispatch(setUser({
        ...userData,
        posts,
        subscriptions: subscriptions
    }))

    dispatch(setSettingData({
        email: userData.email,
        activatedEmail: userData.activatedEmail
    }))

    router.push('/profile')
}

const SignIn = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync:signIn } = useMutation('sign in', (data: IAuthForm) => AuthService.signIn(data),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, res.user.posts, res.user.subscriptions),
            onError: (err: string): any => notify(err, 'error')
        })

    return (
        <AuthPage title={'Sign in'} action={'signIn'}>
            <AuthForm signAction={signIn} title={'Sign in'} isLoading={isLoading} action={'signIn'} />
        </AuthPage>
    )
}

export default React.memo(SignIn)
