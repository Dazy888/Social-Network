import React from "react"
import { ErrorComponentPropsI } from "@/interfaces/authorization-interfaces"

const ErrorIconComponent: React.FC<ErrorComponentPropsI> = ({ error, serverError, touched }) => {
    return(
        <div>
            { (error && touched) && <i className={'fa-solid fa-circle-exclamation'}/> }
            { serverError && <i className={'fa-solid fa-circle-exclamation'}/> }
        </div>
    )
}
export const ErrorIcon = React.memo(ErrorIconComponent)