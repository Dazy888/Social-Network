import React from "react";

export type ErrorItemsComponent = {
    error: string
    serverError: string
    touched: string
}

export function ErrorMessages({serverError, error, touched}: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <span className={'error-text'}>{error}</span> : null}
            {serverError ? <span className={'error-text'}>{serverError}</span> : null}
        </div>
    )
}