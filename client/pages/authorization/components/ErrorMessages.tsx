import { ErrorItemsComponent } from "../types/authorization-types"
export function ErrorMessages({ serverError, error, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <span>{error}</span> : null}
            {serverError ? <span>{serverError}</span> : null}
        </div>
    )
}