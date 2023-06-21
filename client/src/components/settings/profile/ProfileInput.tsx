import React from "react"
import { UseFormRegister } from "react-hook-form"
import { ProfileSettings } from "@/models/settings.models"
import styles from '@/styles/Settings.module.scss'

interface Props {
    isError: boolean
    register: UseFormRegister<ProfileSettings>
    name: 'name' | 'location'
    pattern: RegExp
}

const ProfileInputComponent: React.FC<Props> = ({ name, register, isError, pattern }) => (
    <div className={`error-container`}>
        {isError && <span>Invalid value</span>}
        <input required type={'text'} placeholder={`Enter your new ${name}`} minLength={2} maxLength={20} className={`${(isError) ? 'red-border' : ''} ${styles['big-input']}`}
               {...(register(name, { pattern: { value: pattern, message: 'Invalid value' } }))}
        />
    </div>
)

export const ProfileInput = React.memo(ProfileInputComponent)