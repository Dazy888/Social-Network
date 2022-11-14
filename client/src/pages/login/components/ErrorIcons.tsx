import { ErrorItemsComponent } from "./ErrorMessages"
import React from "react"

export function ErrorIcons({ error, serverError, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
            {serverError ? <i className="fa-solid fa-circle-exclamation error"></i> : null}
        </div>
    )
}