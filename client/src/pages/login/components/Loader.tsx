import { ScaleLoader } from "react-spinners"

type PropsType = {
    loading: boolean
    css: any
    color: string
}

export function LoginLoader({ loading, css, color }: PropsType) {
    return(
        <div className={'loader'}>
            <ScaleLoader color={color} loading={loading} cssOverride={css} />
        </div>
    )
}