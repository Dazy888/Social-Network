import React from "react"
// CSS
import '../styles/header.css'
// Navigation
import { NavLink, useNavigate } from "react-router-dom"
// React Query
import { useQuery } from "react-query"
// Service
import { AuthService } from "../../../services/AuthService"
// Store
import { authActions } from "../../../store/reducers/auth/auth-reducer"
import { getAvatar } from "../../../store/reducers/profile/profile-selectors"
// Redux
import { useDispatch, useSelector } from "react-redux"

export default React.memo(function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const avatar = useSelector(getAvatar)

    const { refetch } = useQuery('logout', () => AuthService.logout(),
        {
            enabled: false,
            onSuccess() {
                localStorage.removeItem('token')
                dispatch(authActions.setAuthData(false))
                navigate('/login/sign-in')
            }
        }
    )

    return (
        <div id={'header'} className={'flex-property-set_center'}>
            <div className={'header__content flex-property-set_between'}>
                <img alt={'Logo'} className={'header__logo'} src={'https://user-images.githubusercontent.com/16946573/144957680-01ea405e-959b-46b1-a163-df688466ac23.png'}/>
                <nav>
                    <ul className={'flex-property-set_between'}>
                        <NavLink to={'/main/profile'}>Profile</NavLink>
                        <NavLink to={'/main/users'}>Users</NavLink>
                        <NavLink to={'/main/settings'}>Settings</NavLink>
                    </ul>
                </nav>
                <div className={'header__logout flex-property-set_between'}>
                    <img alt={'Avatar'} src={avatar} className={'header__avatar'}/>
                    <button onClick={() => refetch()}>Logout</button>
                </div>
            </div>
        </div>
    )
})