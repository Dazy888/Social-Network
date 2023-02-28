import React from "react"
import { ErrorComponentProps } from "../interfaces/interfaces"
const ErrorMessages: React.FC<ErrorComponentProps> = ({ serverError, error, touched }) => {
    return(
        <div>
            { error && touched ? <span>{error}</span> : null }
            { serverError ? <span>{serverError}</span> : null }
        </div>
    )
}
export const Messages = React.memo(ErrorMessages)