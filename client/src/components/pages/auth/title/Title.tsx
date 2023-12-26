import React from "react"
import { Subtitle } from "@/components/pages/auth/title/Subtitle"
import { Action } from "@/models/auth.models"

interface Props {
    title: string
    action: Action
}

export const Title: React.FC<Props> = ({ title, action }) => (
    <div>
        <h1 className={'text-3xl font-medium'}>{title}</h1>
        <p className={'text-sm pl-0.5 mt-1'}>
            { (action === 'signIn') && <Subtitle question={'New user'} linkText={'Create an account'} path={'up'} /> }
            { (action === 'signUp') && <Subtitle question={'Already have an account'} linkText={'Sign in'} path={'in'} /> }
        </p>
    </div>
)
