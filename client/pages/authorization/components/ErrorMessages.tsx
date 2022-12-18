export type ErrorItemsComponent = {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export function ErrorMessages({ serverError, error, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <span>{error}</span> : null}
            {serverError ? <span>{serverError}</span> : null}
        </div>
    )
}