import React, { useEffect, useRef } from "react"
// Navigation
import { Route, Routes, useNavigate } from "react-router-dom"
// Components
import SignIn from "./Sign-In"
import SignUp from "./Sign-Up"
// CSS
import './styles/Login.css'
import './styles/Media.css'

export default React.memo(function LoginPage() {
    const navigate = useNavigate()
    const actions: any = useRef()

    useEffect(() => {
        if (localStorage.getItem('token')) navigate('/main/profile')
    }, [])

    const validate = (userLogin: string, password: string) => {
        const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
        const login = /^[a-zA-Z0-9]+$/

        let errors: any = {}

        if (!userLogin) {
            errors.userLogin = 'Login is required'
        } else if (!login.test(userLogin)) {
            errors.userLogin = 'Invalid login'
        }

        if (!password) {
            errors.password = 'Password is required'
        } else if (!pass.test(password) || /\s/.test(password)) {
            errors.password = 'Invalid password'
        }

        return errors
    }

    function choseAction(event: any) {
        const activeAction = actions.current.querySelector('.active-action')
        if (activeAction) activeAction.classList.remove('active-action')
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
                        <Route path={'/sign-in'} element={<SignIn validate={validate}/>}/>
                        <Route path={'/sign-up'} element={<SignUp validate={validate}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
})