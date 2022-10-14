import './Error.css'
import {useNavigate} from "react-router-dom"

export function Error() {
    const navigate = useNavigate()

    return(
        <div className={'error'}>
            <div className={'error__container flex-property-set_between'}>
                <h1>404</h1>
                <hr/>
                <p>Something went wrong, go back to the main page</p>
            </div>
            <button onClick={() => navigate('/main/profile')}>Go Home</button>
        </div>
    )
}