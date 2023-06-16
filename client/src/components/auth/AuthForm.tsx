import React, { useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { IAuthForm}  from "@/models/auth.models"
import ReCAPTCHA from "react-google-recaptcha"
import { SubmitBtn } from "@/components/auth/SubmitBtn"
import { AuthInput } from "@/components/auth/AuthInput"

export const notify = (text: string, type: 'error' | 'success' | 'warning') => toast(text, { type })

interface Props {
    action: 'sign-in' | 'sign-up'
    isLoading: boolean
    signAction: (data: IAuthForm) => void
}

const AuthFormComponent: React.FC<Props> = ({ action, signAction, isLoading }) => {
    const reRef: any = useRef<ReCAPTCHA>()

    const [captchaToken, setCaptchaToken] = useState<string | null>('')
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<IAuthForm>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        if (isLoading) notify('Too many requests', 'warning')
        if (!captchaToken) return notify('Please confirm that you are not a robot', 'warning')

        const requestData = { login: data.login, pass: data.pass }
        if (action === 'sign-up') {
            signAction(requestData)
        } else {
            signAction(requestData)
        }
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className={'w-9/12'}>
            <AuthInput type={'text'} errorMessage={errors.login?.message} isError={!!(errors.login?.message && touchedFields.login)} register={register} name={'login'}
                   patternValue={/^[a-zA-Z0-9]+$/} minLength={4} maxLength={10} placeholder={'Login'}
            />
            <AuthInput type={'password'} errorMessage={errors.pass?.message} isError={!!(errors.pass?.message && touchedFields.pass)} register={register} name={'pass'}
                   patternValue={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/} minLength={8} maxLength={15} placeholder={'Password'}
            />
            <ReCAPTCHA ref={reRef} sitekey={'6LfPBogmAAAAAJ8cP0kTqqd1q2n1RFvIRaTstbMN'} onChange={(value) => setCaptchaToken(value)}
                       style={{ transform: 'scale(0.77)', transformOrigin: '0 0' }}
            />
            <SubmitBtn isLoading={isLoading} value={(action === 'sign-in') ? 'in' : 'up'}/>
        </form>
    )
} 

export const AuthForm = React.memo(AuthFormComponent)
