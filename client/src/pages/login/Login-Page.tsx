import React, { useEffect, useRef } from "react"
// Navigation
import { Route, Routes, useNavigate } from "react-router-dom"
// Components
import SignIn from "./Sign-In"
import SignUp from "./Sign-Up"
// CSS
import './Login.css'
import './Media.css'

export default React.memo(function LoginPage() {
    const navigate = useNavigate()
    const actions: any = useRef()

    useEffect(() => {
        if (localStorage.getItem('token')) navigate('/main/profile')
    }, [])

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
                        <Route path={'/sign-in'} element={<SignIn/>}/>
                        <Route path={'/sign-up'} element={<SignUp/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
})