import React from "react"
import '../styles/Header.css'
import {NavLink, useNavigate} from "react-router-dom"

type PropsType = {
    logout: () => void
    avatar: string
}

export default React.memo(function Header({avatar, logout}: PropsType) {
    const navigate = useNavigate()

    async function goLogout() {
        await logout()
        navigate('/login/sign-in')
    }

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
                    <button className={'header__btn'} onClick={goLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
})