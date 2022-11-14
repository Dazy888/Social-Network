import React from "react"
// Navigation
import { Route, Routes, useNavigate } from "react-router-dom"
// Components
import Header from "./components/Header"
import { Profile } from "../profile/Profile"
import { Settings } from "../settings/Settings"
import { ProfileLoader } from "./components/Profile-Loader"
import { Users } from "../users/Users"
import { NoContent } from "../404/NoContent"
// Redux
import { useDispatch } from "react-redux"
// React Query
import { useQuery } from "react-query"
// Service
import { AuthService } from "../../services/AuthService"
// Store
import { authActions } from "../../store/reducers/auth/auth-reducer"
import { profileActions } from "../../store/reducers/profile/profile-reducer"
import { settingsActions } from "../../store/reducers/settings/settings-reducer"

export default React.memo(function MainPage() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading } = useQuery('check auth', () => AuthService.refresh(),
        {
            onSuccess(response) {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.accessToken)
                    dispatch(authActions.setAuthData(response.data.user.isActivated))

                    const user = response.data.user
                    dispatch(profileActions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id, response.data.posts, user.email))
                    dispatch(settingsActions.setEmail(user.email))
                } else {
                    navigate('/login/sign-in')
                }
            }
        })

    return(
        <div id={'app-wrapper'}>
            <Header/>
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