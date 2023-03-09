import React from "react"
import { ErrorComponentProps } from "@/interfaces/auth.interfaces"

const ErrorMessageComponent: React.FC<ErrorComponentProps> = ({ serverError, error, touched }) => {
    return(
        <div>
            { (error && touched) && <span>{error}</span> }
            { serverError && <span>{serverError}</span> }
        </div>
    )
}
export const ErrorMessage = React.memo(ErrorMessageComponent)
