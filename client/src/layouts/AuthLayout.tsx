import React, { useEffect, useRef, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from '@/styles/Authorization.module.scss'
import { notify } from "@/components/auth/AuthForm"
// Models
import { IAuthForm } from "@/models/auth.models"
import ReCAPTCHA from "react-google-recaptcha"
import { LayoutProps } from "@/models/layouts.models"
// Components
import { AuthInput } from "@/components/auth/AuthInput"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
import { NavLink } from "@/components/navigation/NavLink"
import {ToastContainer} from "react-toastify";
import {PassRequirements} from "@/components/common/PassRequirements";

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

        const requestData = { login: data.login, pass: data.pass }
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
                <div className={`${styles['auth']} flex-center rounded-r-xl`}>
                    <div className={`${styles['auth__actions']} h-full w-2/12`}>
                        <NavLink paths={['/auth/sign-in']} activeClass={'active'} iconClass={'fa-solid fa-arrow-right-to-bracket'}/>
                        <NavLink paths={['/auth/sign-up']} activeClass={'active'} iconClass={'fa-solid fa-address-card'}/>
                    </div>
                    <div className={`${styles['auth__content']} flex justify-center w-10/12 relative`}>
                        <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
                            <AuthInput type={'text'} errorMessage={errors.login?.message} isError={!!(errors.login?.message && touchedFields.login)} register={register} name={'login'}
                                       patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} placeholder={'Login'} classNames={'mb-4'}
                            />
                            <div className={'mb-10 mt-7'}>
                                <AuthInput type={'password'} register={register} name={'pass'} isError={!!(errors.pass?.message && touchedFields.pass)} minLength={8} placeholder={'Password'}
                                           patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/}
                                />
                                { (title === 'up') && <PassRequirements isMinLength={currentPass?.length > 7} isOneDigit={/\d/g.test(currentPass)} isUppLetter={/[A-Z]/g.test(currentPass)}
                                                                        isLowLetter={/[a-z]/g.test(currentPass)} isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(currentPass)}
                                                      />
                                }
                            </div>
                            <ReCAPTCHA ref={reRef} sitekey={'6LfPBogmAAAAAJ8cP0kTqqd1q2n1RFvIRaTstbMN'} onChange={(value) => setCaptchaToken(value)} className={'captcha'}
                                       style={{ transform: 'scale(0.77)', transformOrigin: '0 0' }}
                            />
                            <SubmitBtn isLoading={isLoading} value={title}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export const AuthPage = React.memo(AuthLayout)
