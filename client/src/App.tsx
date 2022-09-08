// React items
import React, {useEffect} from 'react'
// Navigation
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
// Pages
import {LoginPage} from "./pages/login/Login-Page"
import {MainPage} from "./pages/main/Main-Page"
// Redux
import {connect, Provider, useSelector} from "react-redux"
import store from "./store/store"
import {compose} from "redux"
// Props
import {checkAuth, login, logout, registration} from "./store/reducers/auth-reducer"
// Types
import {Login, Registration} from "./pages/login/types/login-types"
import {getEmail} from "./store/reducers/auth-selectors"

type PropsType = {
    checkAuth: () => void
    logout: () => any
    login: Login
    registration: Registration
}

function App({checkAuth, login, registration, logout}: PropsType) {
    let navigate = useNavigate()
    const email = useSelector(getEmail)

    useEffect( () => {
        if (localStorage.getItem('token')) {
            checkAuth()
            navigate('/')
        } else {
            navigate('/login/sign-in')
        }
    }, [])


    return(
        <div>
            <Routes>
                <Route path={'/'} element={<MainPage userName={email} logout={logout}/>}></Route>
                <Route path={'/login/*'} element={<LoginPage navigate={navigate} login={login} registration={registration}/>}></Route>
            </Routes>
        </div>
    )
}

let mapStateToProps
const SocialNetworkApp = compose<React.ComponentType>(connect(mapStateToProps, {login, registration, checkAuth, logout}))(App);

export const SocialNetwork: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <SocialNetworkApp/>
            </Provider>
        </BrowserRouter>
    )
}