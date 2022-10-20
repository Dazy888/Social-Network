import React, {useEffect} from "react"
// Navigation
import {Route, Routes, useNavigate} from "react-router-dom"
// Components
import Header from "./components/Header"
import {Profile} from "../profile/Profile"
import {Settings} from "../settings/Settings"
import {ProfileLoader} from "./components/Profile-Loader"
import {Users} from "../users/Users"
import {NoContent} from "../404/No-Content"
// Store
import {connect, useSelector} from "react-redux"
import {getAvatar} from "../../store/reducers/profile/profile-selectors"
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

    async function sendAuthReq() {
        if (await auth()) navigate('/login/sign-in')
    }

    useEffect(() => {
        sendAuthReq()
    }, [])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <div id={'content'}>
                {avatar
                    ?   <Routes>
                            <Route path={'/profile'} element={<Profile />}/>
                            <Route path={'/settings/*'} element={<Settings/>}/>
                            <Route path={'/users/*'} element={<Users/>}/>
                            <Route path={'*'} element={<NoContent/>}/>
                        </Routes>
                    :   <ProfileLoader/>}
            </div>
        </div>
    )
}

export const MainPage = compose<React.ComponentType>(connect(null, {auth, logout}))(React.memo(MainPageComponent))