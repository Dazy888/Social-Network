import React, { CSSProperties } from "react"
import { FadeLoader } from "react-spinners"

const override: CSSProperties = {
    display: "block",
    width: "fit-content",
    margin: "400px auto",
    borderColor: "red"
}

const LoaderComponent = () => {
    return(
        <div className={'users'}>
            <div className={'loader'}>
                <FadeLoader color={"rgb(102, 51, 153)"} loading={true} cssOverride={override} />
            </div>
        </div>
    )
}

export const Loader = React.memo(LoaderComponent)
