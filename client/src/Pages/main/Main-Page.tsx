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

type LayoutProps = {
    avatar: string
}

function MainLayout({avatar}: LayoutProps): any {
    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <div id={'content'}>
                {avatar
                    ?   <Routes>
                        <Route path={'/main/profile'} element={<Profile />}/>
                        <Route path={'/main/settings/*'} element={<Settings/>}/>
                        {/*<Route path={'/users/*'} element={<Users/>}/>*/}
                    </Routes>
                    :   <ProfileLoader/>}
            </div>
        </div>
    )
}

function MainPageComponent({logout, auth}: PropsType) {
    const avatar = useSelector(getAvatar)

    useEffect(() => {
        auth()
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