import React from "react"

interface Props {
    text: string
    state: boolean
    className: string
}

export const PassRequirement: React.FC<Props> = ({ state, text, className }) => (
    <li>
        <span className={`inline-block ${className}`}>{text}</span>
        <i className={`fa-solid fa-${state ? 'check' : 'xmark text-xs'}`} />
    </li>
)
