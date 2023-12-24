import React from "react"
import { PassRequirement } from "@/components/common/PassRequirement"

interface Props {
    isMinLength: boolean
    isOneDigit: boolean
    isUppLetter: boolean
    isLowLetter: boolean
    isSpecialCharacter: boolean
    className: string
}

export const PassRequirements: React.FC<Props> = (props) => {
    const { isMinLength, isSpecialCharacter, isUppLetter, isLowLetter, isOneDigit, className } = props

    return (
        <ol className={'pass-requirements list-disc pl-5 mt-3 text-sm'}>
            <PassRequirement className={className} text={'Must have at least 8 characters'} state={isMinLength}/>
            <PassRequirement className={className} text={'Must contain at least one digit'} state={isOneDigit}/>
            <PassRequirement className={className} text={'Must contain at least one uppercase letter'} state={isUppLetter} />
            <PassRequirement className={className} text={'Must contain at least one lowercase letter'} state={isLowLetter} />
            <PassRequirement className={className} text={'Must contain at least one special character'} state={isSpecialCharacter} />
        </ol>
    )
}
