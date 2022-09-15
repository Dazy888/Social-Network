// React
import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {SignIn} from "./Sign-In"
import {SignUp} from "./Sign-Up"
// CSS
import './styles/Login.css'
import './styles/Media.css'
// Types
import {Login, Navigate, Registration} from "./types/login-types"

type PropsType = {
    login: Login
    registration: Registration
    navigate: Navigate
}

export function LoginPage({login, registration, navigate}: PropsType) {
    const actions: any = React.createRef()

    const validate = (userLogin: string, password: string) => {
        const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
        const login = /^[a-zA-Z0-9]+$/
        const errors: any = {}

        if (!userLogin) {
            errors.userLogin = 'Login is required'
        } else if (!login.test(userLogin)) {
            errors.userLogin = 'Invalid login'
        }

        if (!password) {
            errors.password = 'Password is required'
        } else if (!pass.test(password)) {
            errors.password = 'Invalid password'
        }

        return errors
    }

    function choseAction(event: any) {
        if (actions.current.querySelector('.active-action')) actions.current.querySelector('.active-action').classList.remove('active-action')
        event.target.classList.add('active-action')
    }

    return (
        <div id={'login-wrapper'}>
            <div className={'login'}>
                <div onClick={choseAction} className={'login__actions'} ref={actions}>
                    <button className={'actions__login active-action'} onClick={() => navigate('/login/sign-in')}>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </button>
                    <button className={'actions__register'} onClick={() => navigate('/login/sign-up')}>
                        <i className="fa-solid fa-address-card"></i>
                    </button>
                </div>
                <div className={'login__content'}>
                    <Routes>
                        <Route path={'/sign-in'} element={<SignIn navigate={navigate} login={login} validate={validate}/>}/>
                        <Route path={'/sign-up'} element={<SignUp navigate={navigate} registration={registration}validate={validate}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}