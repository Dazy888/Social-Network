import React from "react"
import { ErrorComponentPropsI } from "@/interfaces/authorization-interfaces"
const ErrorMessageComponent: React.FC<ErrorComponentPropsI> = ({ serverError, error, touched }) => {
    return(
        <div>
            { error && touched ? <span>{error}</span> : null }
            { serverError ? <span>{serverError}</span> : null }
        </div>
    )
}
export const ErrorMessage = React.memo(ErrorMessageComponent)