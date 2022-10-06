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
import {checkAuth} from "./store/reducers/auth/auth-reducer"

type PropsType = {
    checkAuth: () => void
}

function App({checkAuth}: PropsType) {
    let navigate = useNavigate()

    useEffect( () => {
        (localStorage.getItem('token')) ? checkAuth() : navigate('/login/sign-in')
    }, [])

    useEffect(() => {
        navigate(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
        window.onbeforeunload = () => window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
    }, [])

    return(
        <div>
            <Routes>
                <Route path={'/*'} element={<MainPage />}></Route>
                <Route path={'/login/*'} element={<LoginPage/>}></Route>
            </Routes>
        </div>
    )
}

const SocialNetworkApp = compose<React.ComponentType>(connect(null, {checkAuth}))(App)

export default React.memo(function SocialNetwork() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <SocialNetworkApp/>
            </Provider>
        </BrowserRouter>
    )
})