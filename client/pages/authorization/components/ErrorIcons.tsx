import React from "react";
import { ErrorComponentProps } from "../interfaces/interfaces"
const ErrorIcons: React.FC<ErrorComponentProps> = ({ error, serverError, touched }) => {
    return(
        <div>
            { error && touched ? <i className={`fa-solid fa-circle-exclamation`}/> : null }
            { serverError ? <i className={`fa-solid fa-circle-exclamation`}/> : null }
        </div>
    )
}
export const Icons = React.memo(ErrorIcons)