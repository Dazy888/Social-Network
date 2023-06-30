import React from "react"

interface Props {
    title: string
}

const TitleComponent: React.FC<Props> = ({ title }) => <h3 className={'text-lg font-semibold'}>{title}</h3>
export const Title = React.memo(TitleComponent)
