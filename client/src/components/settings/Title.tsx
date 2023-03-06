import React from "react"

interface PropsI {
    title: string
}

const TitleComponent: React.FC<PropsI> = ({ title }) => {
    return(
        <h3 className={'text-lg font-bold'}>{title}</h3>
    )
}

export const Title = React.memo(TitleComponent)