import { ErrorItemsComponent } from "./ErrorMessages"
import styles from '../../../styles/Authorization.module.scss'

export function ErrorIcons({ error, serverError, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <i className={`fa-solid fa-circle-exclamation`}></i> : null}
            {serverError ? <i className={`fa-solid fa-circle-exclamation`}></i> : null}
        </div>
    )
}