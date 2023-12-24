import React from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { useAppDispatch } from "@/hooks/redux"
import { successfulEnter } from "@/pages/auth/sign-in"
import { notify } from "@/components/pages/auth/form/AuthForm"
// Models
import { IAuthForm } from "@/models/auth.models"
// Service
import { AuthService } from "@/services/auth.service"
// Components
import { AuthPage } from "@/layouts/AuthLayout"

const SignUp = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const mutationKey = 'sign up'
    const mutationFunc = (data: IAuthForm) => AuthService.signUp(data)

    const {isLoading, mutateAsync:signUp} = useMutation(mutationKey, mutationFunc, {
            onSuccess: (res) => {
                successfulEnter(
                    router,
                    dispatch,
                    res.tokens,
                    res.user,
                    [],
                    {
                        followers: [],
                        followings: []
                    }
                )
            },
            onError: (err: string): any => notify(err, 'warning')
        })

    return (
        <AuthPage title={'up'} isLoading={isLoading} signAction={signUp}>
            <></>
        </AuthPage>
    )
}

export default React.memo(SignUp)
