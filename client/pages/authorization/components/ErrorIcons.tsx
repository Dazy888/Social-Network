import { ErrorItemsComponent } from "../types/authorization-types"
export function ErrorIcons({ error, serverError, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <i className={`fa-solid fa-circle-exclamation`}/> : null}
            {serverError ? <i className={`fa-solid fa-circle-exclamation`}/> : null}
        </div>
    )
}