import React from "react"

interface IProps {
    title: string
}

const TitleComponent: React.FC<IProps> = ({ title }) => <h3 className={'text-lg font-bold'}>{title}</h3>
export const Title = React.memo(TitleComponent)
