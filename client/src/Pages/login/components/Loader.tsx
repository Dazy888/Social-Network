import {CSSProperties} from "react"
import {ScaleLoader} from "react-spinners"

const override: CSSProperties = {
    display: "block",
    width: "fit-content",
    position: "relative",
    left: "150px",
    margin: "30px auto",
    borderColor: "red",
};

type PropsType = {
    loading: boolean
}

export function LoginLoader({loading}: PropsType) {
    return(
        <div className={'loader'}>
            <ScaleLoader
                color={"rgb(249, 94, 59)"} loading={loading} cssOverride={override}  />
        </div>
    )
}