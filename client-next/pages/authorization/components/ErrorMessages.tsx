import styles from '../../../styles/Authorization.module.scss'
export type ErrorItemsComponent = {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export function ErrorMessages({ serverError, error, touched }: ErrorItemsComponent) {
    return(
        <div>
            {error && touched ? <span className={styles['error-text']}>{error}</span> : null}
            {serverError ? <span className={styles['error-text']}>{serverError}</span> : null}
        </div>
    )
}