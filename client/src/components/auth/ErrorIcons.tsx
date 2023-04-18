import React from "react"
import { ErrorComponentProps } from "@/models/auth"

const ErrorIconComponent: React.FC<ErrorComponentProps> = ({ error, serverError, touched }) => {
    return(
        <div>
            { (error && touched) && <i className={'fa-solid fa-circle-exclamation'}/> }
            { serverError && <i className={'fa-solid fa-circle-exclamation'}/> }
        </div>
    )
}

export const ErrorIcon = React.memo(ErrorIconComponent)
