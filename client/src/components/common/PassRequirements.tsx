import React from "react"
import { PassRequirement } from "@/components/common/PassRequirement"

interface Props {
    isMinLength: boolean
    isOneDigit: boolean
    isUppLetter: boolean
    isLowLetter: boolean
    isSpecialCharacter: boolean
}

const PassRequirementsComponent: React.FC<Props> = ({ isMinLength, isSpecialCharacter, isUppLetter, isLowLetter, isOneDigit }) => (
    <ol className={'list-disc pl-5 mt-3 text-sm'}>
        <PassRequirement text={'Must have at least 8 characters'} state={isMinLength} />
        <PassRequirement text={'Must contain at least one digit'} state={isOneDigit} />
        <PassRequirement text={'Must contain at least one uppercase letter'} state={isUppLetter} />
        <PassRequirement text={'Must contain at least one lowercase letter'} state={isLowLetter} />
        <PassRequirement text={'Must contain at least one special character'} state={isSpecialCharacter} />
    </ol>
)

export const PassRequirements = React.memo(PassRequirementsComponent)
