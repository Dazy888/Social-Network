type PropsType = {
    children: any
}

export function AuthorizationLayout({ children }: PropsType) {
    return(
        <div>
            <h1>It is authorization layout</h1>
            {children}
        </div>
    )
}