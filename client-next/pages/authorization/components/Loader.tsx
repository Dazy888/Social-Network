import ScaleLoader from "react-spinners/ScaleLoader"

type PropsType = {
    loading: boolean
    color: string
}

export function LoginLoader({ loading, color }: PropsType) {
    return(
        <div className={'loader'}>
            <ScaleLoader color={color} loading={loading}/>
        </div>
    )
}