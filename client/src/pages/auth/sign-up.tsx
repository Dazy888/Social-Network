import React from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { useAppDispatch } from "@/hooks/redux"
import { IAuthForm } from "@/models/auth"
import { successfulEnter } from "@/pages/auth/sign-in"
// Service
import { AuthService } from "@/services/auth.service"
// Components
import { AuthPage } from "@/layouts/AuthLayout"
import { AuthForm, notify } from "@/components/auth/AuthForm"

const SignUp = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync:signUp } = useMutation('sign up', (data: IAuthForm) => AuthService.registration(data.login, data.pass),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, []),
            onError: (err: string): any => notify(err, 'warning')
        })

    return(
        <AuthPage title={'up'}>
            <AuthForm action={'sign-up'} isLoading={isLoading} signAction={signUp} />
        </AuthPage>
    )
}

export default React.memo(SignUp)
