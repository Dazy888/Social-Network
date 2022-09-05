// React
import React, {SyntheticEvent} from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {SignIn} from "./Sign-In"
import {SignUp} from "./Sign-Up"
// CSS
import './Login.css'
// Types
import {DefaultFunction, FormValues, Login, Navigate, Registration} from "./types/login-types"

type PropsType = {
    login: Login
    registration: Registration
    navigate: Navigate
}

export function LoginPage({login, registration, navigate}: PropsType) {
    const actions: any = React.createRef()

    const validate = (values: FormValues) => {
        const errors: any = {}

        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Password is required'
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(values.password)) {
            errors.password = 'Invalid password'
        }

        return errors
    }

    function inputController(changeInputValue: DefaultFunction, changeFieldError: DefaultFunction, value: string): void {
        changeFieldError('')
        changeInputValue(value)
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
                        <Route path={'/sign-in'} element={<SignIn inputController={inputController} navigate={navigate} login={login} validate={validate}/>}/>
                        <Route path={'/sign-up'} element={<SignUp inputController={inputController} navigate={navigate} registration={registration}validate={validate}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}