import {CSSProperties} from "react"
import {FadeLoader} from "react-spinners"

const override: CSSProperties = {
    display: "block",
    width: "fit-content",
    margin: "400px auto",
    borderColor: "red",
};

export function ProfileLoader() {
    return(
        <div className={'loader'}>
            <FadeLoader
                color={"rgb(102, 51, 153)"} loading={true} cssOverride={override}  />
        </div>
    )
}