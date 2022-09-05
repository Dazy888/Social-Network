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
// Props
import {checkAuth, login, registration} from "./store/reducers/auth-reducer"
// Types
import {Login, Registration} from "./pages/login/types/login-types"

type PropsType = {
    checkAuth: () => void
    login: Login
    registration: Registration
}

function App({checkAuth, login, registration}: PropsType) {
    let navigate = useNavigate()

    useEffect( () => {
        localStorage.removeItem('token')
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
                <Route path={'/'} element={<MainPage/>}></Route>
                <Route path={'/login/*'} element={<LoginPage navigate={navigate} login={login} registration={registration}/>}></Route>
            </Routes>
        </div>
    )
}

let mapStateToProps
const SocialNetworkApp = compose<React.ComponentType>(connect(mapStateToProps, {login, registration, checkAuth}))(App);

export function SocialNetwork() {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <SocialNetworkApp/>
          </Provider>
      </BrowserRouter>
  )
}