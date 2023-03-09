import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

interface IProps {
    loading: boolean
    color: string
}

const LoginLoaderComponent: React.FC<IProps> = ({ loading, color }) => {
    return(
        <div className={'loader'}>
            <ScaleLoader color={color} loading={loading}/>
        </div>
    )
}

export const Loader = React.memo(LoginLoaderComponent)
