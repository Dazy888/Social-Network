import React, {useEffect} from "react"
// Navigation
import {useNavigate} from "react-router-dom"
// Components
import Header from "./components/Header"
import Content from "./components/Content"
// Store
import {connect, useSelector} from "react-redux"
import {getAvatar} from "../../store/reducers/profile/profile-selectors"
import {getAuthStatus} from "../../store/reducers/auth/auth-selectors"
import {compose} from "redux"
import {logout} from "../../store/reducers/auth/auth-reducer"
import {auth} from "../../store/reducers/profile/profile-reducer"
// Type
import {User} from "./types/Main-Types"

type PropsType = {
    logout: () => void
    auth: () => User
}

function MainPageComponent({logout, auth}: PropsType) {
    const navigate = useNavigate()
    const avatar = useSelector(getAvatar)
    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        (!isAuth) ? navigate('login/sign-in') : auth()
    }, [isAuth])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <Content avatar={avatar}/>
        </div>
    )
}

export const MainPage = compose<React.ComponentType>(connect(null, {auth, logout}))(React.memo(MainPageComponent))