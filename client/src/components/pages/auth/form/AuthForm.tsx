import React, { useRef, useState } from "react"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import styles from '@/styles/Auth.module.scss'
// Models
import { IAuthForm}  from "@/models/auth.models"
import ReCAPTCHA from "react-google-recaptcha"
// Components
import { SubmitBtn } from "@/components/pages/auth/form/SubmitBtn"
import { AuthInput } from "@/components/pages/auth/form/AuthInput"
import { PassRequirements } from "@/components/common/PassRequirements"

export const notify = (text: string, type: 'error' | 'success' | 'warning') => toast(text, { type })

interface Props {
    title: string
    isLoading: boolean
    signAction: (data: IAuthForm) => void
}

const AuthFormComponent: React.FC<Props> = ({ title, signAction, isLoading }) => {
    const reRef: any = useRef<ReCAPTCHA>()
    const [captchaToken, setCaptchaToken] = useState<string | null>('')

    const {
        register, handleSubmit, watch,
        setFocus, formState: { errors, touchedFields}
    } = useForm<IAuthForm>({ mode: 'onSubmit' })

    const userName = watch('username')
    const pass = watch('pass')

    const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')
        signAction(data)
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={''}>
            <div className={`grid gap-7 mt-10 ${styles['inputs'] || ''}`}>
                <AuthInput type={'text'} errorMessage={errors.username?.message} isError={!!(errors.username?.message && touchedFields.username)}
                           register={register} name={'username'} patternValue={/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/} minLength={4} maxLength={10}
                           placeholder={'Login'} value={userName} setFocus={setFocus}
                />
                <AuthInput type={'password'} register={register} name={'pass'} isError={!!(errors.pass?.message && touchedFields.pass)}
                           minLength={8} maxLength={15} placeholder={'Password'} setFocus={setFocus} value={pass}
                           patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/}
                />
            </div>
            { (title === 'up')
                &&  <PassRequirements isMinLength={pass?.length > 7} isOneDigit={/\d/g.test(pass)} isUppLetter={/[A-Z]/g.test(pass)}
                                      className={styles['pass-requirement']} isLowLetter={/[a-z]/g.test(pass || '')}
                                      isSpecialCharacter={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(pass)}
                    />
            }
            <ReCAPTCHA ref={reRef} sitekey={'6Leond0hAAAAAOCUq2naPPzgveoMehWQmYG4Vabt'} size={'normal'} className={styles.captcha}
                       onChange={(value) => setCaptchaToken(value)}
            />
            <div className={`flex justify-between items-center ${styles.submit}`}>
                {title == 'in' && <Link className={'relative pb-1'} href={'/'}>Forgot password?</Link>}
                <SubmitBtn isLoading={isLoading} value={title}/>
            </div>
        </form>
    )
} 

export const AuthForm = React.memo(AuthFormComponent)
