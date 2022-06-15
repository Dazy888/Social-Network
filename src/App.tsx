import React, {useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {Provider, useSelector} from "react-redux"
// Pages
import {LoginPage} from "./Pages/Login/Login-Page"
import {MainPage} from "./Pages/Main/Main-Page";

function App() {
    const authStatus = false
    let navigate = useNavigate()

    useEffect(() => {
        if (!authStatus) {
            navigate('/login')
        }
    }, [])


    return(
        <div>
            <Routes>
                <Route path={'/'} element={<MainPage />}></Route>
                <Route path={'/login'} element={<LoginPage />}></Route>
            </Routes>
        </div>
    )
}

export function SocialNetwork() {
  return (
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  )
}