// React items
import React, {useEffect} from 'react'
// Navigation
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
// Pages
import {LoginPage} from "./pages/login/Login-Page"
import {MainPage} from "./pages/main/Main-Page"
// Redux
import {connect, Provider} from "react-redux"
import store from "./store/store"
import {compose} from "redux"
// Reducers
import {checkAuth, login, logout, registration} from "./store/reducers/auth/auth-reducer"
import {auth, changeAvatar, changeBanner, changeLocation, changeName} from "./store/reducers/profile/profile-reducer"
// Types
import {ChangeLocation, ChangeName, ChangePhoto, Login, Registration} from "./pages/login/types/login-types"
import {User} from "./pages/main/types/Types"

type PropsType = {
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    checkAuth: () => void
    logout: () => void
    changeName: ChangeName
    changeLocation: ChangeLocation
    auth: () => User
    login: Login
    registration: Registration
}

function App({checkAuth, login, registration, logout, auth, changeLocation, changeName, changeAvatar, changeBanner}: PropsType) {
    let navigate = useNavigate()

    useEffect( () => {
        if (localStorage.getItem('token')) {
            checkAuth()
            navigate('/profile')
        } else {
            navigate('/login/sign-in')
        }
    }, [])


    return(
        <div>
            <Routes>
                <Route path={'/*'} element={<MainPage changeAvatar={changeAvatar} changeBanner={changeBanner} changeLocation={changeLocation} changeName={changeName} navigate={navigate} auth={auth} logout={logout}/>}></Route>
                <Route path={'/login/*'} element={<LoginPage navigate={navigate} login={login} registration={registration}/>}></Route>
            </Routes>
        </div>
    )
}

let mapStateToProps
const SocialNetworkApp = compose<React.ComponentType>(connect(mapStateToProps, {login, registration, checkAuth, logout, auth, changeName, changeLocation, changeBanner, changeAvatar}))(App);

export const SocialNetwork: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <SocialNetworkApp/>
            </Provider>
        </BrowserRouter>
    )
}