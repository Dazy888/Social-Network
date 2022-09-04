import React, {useEffect} from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
// Pages
import {LoginPage} from "./pages/login/Login-Page"
import {MainPage} from "./pages/main/Main-Page";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./store/store";
import {compose} from "redux";
import {checkAuth, login, registration} from "./store/reducers/auth-reducer";

type PropsType = {
    checkAuth: () => void
    login: (email: string, password: string, rememberMe: boolean) => void
    registration: (email: string, password: string) => number
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

let mapStateToProps = (state: AppStateType) => {
    return ({
        email: state.auth.user.email
    })
}

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