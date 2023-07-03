import React from "react"
import { Subtitle } from "@/components/pages/auth/title/Subtitle"

interface Props {
    title: string
}

const TitleComponent: React.FC<Props> = ({ title }) => (
    <div>
        <h1 className={'text-3xl font-medium'}>Sign {title}</h1>
        <p className={'text-sm pl-0.5 mt-1'}>
            {(title === 'in') ? <Subtitle question={'New user'} linkText={'Create an account'} path={'up'} /> : <Subtitle question={'Already have an account'} linkText={'Login'} path={'in'} />}
        </p>
    </div>
)

export const Title = React.memo(TitleComponent)
