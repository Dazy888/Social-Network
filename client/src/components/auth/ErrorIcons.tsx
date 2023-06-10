import React from "react"
import { ErrorComponentProps } from "@/models/auth"

const ErrorIconComponent: React.FC<ErrorComponentProps> = ({ error, touched }) => {
    return (error && touched) && <i className={'fa-solid fa-circle-exclamation'} />
}

export const ErrorIcon = React.memo(ErrorIconComponent)
