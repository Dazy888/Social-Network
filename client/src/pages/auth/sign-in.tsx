import React from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { AuthService } from "@/services/auth.service"
import { useAppDispatch } from "@/hooks/redux"
// Models
import { IAuthForm, Tokens, User } from "@/models/auth"
import { IPost } from "@/models/profile"
// Components
import { AuthPage, createCookie } from "@/layouts/AuthLayout"
import { AuthForm } from "@/components/auth/AuthForm"
// Store
import { setUser } from "@/store/reducers/ProfileSlice"
import { setSettingData } from "@/store/reducers/SettingsSlice"

export const successfulEnter = (router: any, dispatch: any, tokens: Tokens, userData: User, posts: IPost[] | []) => {
    createCookie('refreshToken', tokens.refreshToken, 30)
    createCookie('accessToken', tokens.accessToken, 15 / (24 * 60))

    dispatch(setUser({ ...userData, posts }))
    dispatch(setSettingData({ email: userData.email, isActivated: userData.isActivated}))

    router.push('/main/profile')
}

export const notify = (text: string, type: 'error' | 'success' | 'warning') => toast(text, { type })

const SignIn = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync:signIn } = useMutation('sign in', (data: IAuthForm) => AuthService.login(data.login, data.pass),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, res.posts),
            onError: (err: string): any => notify(err, 'error')
        })

    return(
        <AuthPage title={'in'}>
            <AuthForm action={'sign-in'} isLoading={isLoading} signAction={signIn} />
        </AuthPage>
    )
}

export default React.memo(SignIn)
