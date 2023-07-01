import React from "react"

interface Props {
    text: string
    state: boolean
}

const PassRequirementComponent: React.FC<Props> = ({ state, text }) => (
    <li>
        <span className={'inline-block pass-requirement'}>{text}</span>
        <i className={`fa-solid fa-${state ? 'check' : 'xmark text-xs'}`} />
    </li>
)

export const PassRequirement = React.memo(PassRequirementComponent)
