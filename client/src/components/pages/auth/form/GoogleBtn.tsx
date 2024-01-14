import React from "react"
import { useAppDispatch } from "@/hooks/redux"
import { useMutation } from "react-query"
import { successfulEnter } from "@/pages/auth/sign-in"
import { useRouter } from "next/router"
// Service
import { AuthService } from "@/services/auth.service"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Google
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"

interface Props {
    text: 'signin_with' | 'signup_with'
    context: 'signin' | 'signup'
}

export const GoogleBtn: React.FC<Props> = ({ text, context }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { mutateAsync:signIn } = useMutation('google sign in', (data: CredentialResponse) => AuthService.googleSignIn(data),
        {
            onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, res.user.posts, res.user.subscriptions),
            onError: (err: string): any => notify(err, 'error')
        })

    // const { mutateAsync:signUp } = useMutation('google sign up', (data: CredentialResponse) => AuthService.googleSignUp(data),
    //     {
    //         onSuccess: (res) => successfulEnter(router, dispatch, res.tokens, res.user, res.user.posts, res.user.subscriptions),
    //         onError: (err: string): any => notify(err, 'error')
    //     })

    async function successHandler(credentialResponse: CredentialResponse) {
        if (context === 'signin') {
            await signIn(credentialResponse)
        } else {
            // await signUp(credentialResponse)
        }
    }

    return(
        <div className={'mt-6 mx-auto w-fit'}>
            <GoogleLogin onSuccess={successHandler} onError={() => notify('Some error occurred', 'error')} useOneTap cancel_on_tap_outside
                         text={text} shape={'pill'} context={context}
            />
        </div>
    )
}