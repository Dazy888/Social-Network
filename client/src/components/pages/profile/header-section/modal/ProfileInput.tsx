import React from "react"
import { UseFormRegister } from "react-hook-form"
import styles from '@/styles/Profile.module.scss'
import { ProfileInfo } from "@/models/profile.models"

interface Props {
    isError: boolean
    register: UseFormRegister<ProfileInfo>
    name: 'name'
    pattern: RegExp
    className?: string
}

const ProfileInputComponent: React.FC<Props> = ({ name, register, isError, pattern, className = '' }) => (
    <div className={`${styles['err-container']} relative`}>
        {isError && <span className={'absolute left-1 font-medium'}>Invalid value</span>}
        <input required type={'text'} placeholder={`Enter your new ${name}`} className={`${(isError) ? 'red-border' : ''} ${styles['big-input']} ${styles.input} w-full ${className} rounded-lg pl-3 py-2`}
               {...(register(name, { pattern: { value: pattern, message: 'Invalid value' } }))} minLength={2} maxLength={20}
        />
        {isError && <i className={'fa-solid fa-circle-exclamation absolute right-2'} />}
    </div>
)

export const ProfileInput = React.memo(ProfileInputComponent)
