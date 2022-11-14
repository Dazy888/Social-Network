import React from "react"

export type ErrorItemsComponent = {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export function ErrorMessages({ serverError, error, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <span className={'error-text'}>{error}</span> : null}
            {serverError ? <span className={'error-text'}>{serverError}</span> : null}
        </div>
    )
}