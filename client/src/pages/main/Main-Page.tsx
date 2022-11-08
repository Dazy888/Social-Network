import React from "react"
// Navigation
import { Route, Routes } from "react-router-dom"
// Components
import Header from "./components/Header"
import { Profile } from "../profile/Profile"
import { Settings } from "../settings/Settings"
import { ProfileLoader } from "./components/Profile-Loader"
import { Users } from "../users/Users"
import { NoContent } from "../404/No-Content"
// Store
import { useSelector } from "react-redux"
import { getAvatar } from "../../store/reducers/profile/profile-selectors"

export default React.memo(function MainPage() {
    const avatar = useSelector(getAvatar)

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} />
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
})