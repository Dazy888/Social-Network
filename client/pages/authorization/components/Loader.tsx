import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"
interface Props {
    loading: boolean
    color: string
}
const LoginLoader: React.FC<Props> = ({ loading, color }) => {
    return(
        <div className={'loader'}>
            <ScaleLoader color={color} loading={loading}/>
        </div>
    )
}
export const Loader = React.memo(LoginLoader)