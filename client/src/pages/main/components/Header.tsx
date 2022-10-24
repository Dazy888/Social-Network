import React from "react"
import '../styles/Header.css'
import {NavLink, useNavigate} from "react-router-dom"
import {useQuery} from "react-query";
import {AuthService} from "../../../services/AuthService";
import {authActions} from "../../../store/reducers/auth/auth-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    avatar: string
}

export default React.memo(function Header({ avatar }: PropsType) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { refetch } = useQuery('logout', () => AuthService.logout(),
        {
            enabled: false,
            onSuccess() {
                localStorage.removeItem('token')
                dispatch(authActions.setAuthData(false, false))
                navigate('/login/sign-in')
            }
        }
    )

    return (
        <div id={'header'} className={'flex-property-set_center'}>
            <div className={'header__content flex-property-set_between'}>
                <img alt={'Logo'} className={'header__logo'} src={'https://user-images.githubusercontent.com/16946573/144957680-01ea405e-959b-46b1-a163-df688466ac23.png'}/>
                <ul className={'header__navigation flex-property-set_between'}>
                    <NavLink to={'/main/profile'}>Profile</NavLink>
                    <NavLink to={'/main/users'}>Users</NavLink>
                    <NavLink to={'/main/settings'}>Settings</NavLink>
                </ul>
                <div className={'header__logout flex-property-set_between'}>
                    <img alt={'Avatar'} src={avatar} className={'header__avatar'}/>
                    <button className={'header__btn'} onClick={() => refetch()}>Logout</button>
                </div>
            </div>
        </div>
    )
})