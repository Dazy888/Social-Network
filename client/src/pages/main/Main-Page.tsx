import React from "react"
// Navigation
import { Route, Routes, useNavigate } from "react-router-dom"
// Components
import Header from "./components/Header"
import { Profile } from "../profile/Profile"
import { Settings } from "../settings/Settings"
import { ProfileLoader } from "./components/Profile-Loader"
import { Users } from "../users/Users"
import { NoContent } from "../404/No-Content"
// Store
import { useDispatch, useSelector } from "react-redux"
import { getAvatar } from "../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../store/reducers/profile/profile-reducer"
import { settingsActions } from "../../store/reducers/settings/settings-reducer"
// React Query
import { useQuery } from "react-query"
// Service
import { AuthService } from "../../services/AuthService"

export default React.memo(function MainPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const avatar = useSelector(getAvatar)

    const {isLoading} = useQuery('authorization', () => AuthService.refresh(),
        {
            onSuccess(response) {
                if (typeof response.data === "string") navigate('/login/sing-in')
                const user = response.data.user
                dispatch(profileActions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id, response.data.posts, user.email))
                dispatch(settingsActions.setEmail(user.email))
            }
        }
    )

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} />
            <div id={'content'}>
                {!isLoading
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