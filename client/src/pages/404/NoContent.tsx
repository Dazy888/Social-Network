import { useNavigate } from "react-router-dom"
import './no-content.css'

export function NoContent() {
    const navigate = useNavigate()

    return(
        <div className={'no-content'}>
            <div className={'no-content__container flex-property-set_between'}>
                <h1 className={'text'}>404</h1>
                <hr/>
                <p className={'text'}>Something went wrong, go back to the main page</p>
            </div>
            <button className={'text'} onClick={() => navigate('/main/profile')}>Go Home</button>
        </div>
    )
}