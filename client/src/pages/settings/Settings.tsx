import React, { useEffect } from "react"
// Navigation
import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
// CSS
import './styles/settings.css'
// Components
import { ChangePass } from "./components/Change-Pass"
import Email from "./components/Activate"
import { NoContent } from "../404/NoContent"

type PropsType = {
    path: string
}

function Content({ path }: PropsType) {
    return(
        <div className={'settings flex-property-set_center'}>
            <div className={'settings__container flex-property-set_between'}>
                <nav className={'flex-property-set_center'}>
                    <ul>
                        <NavLink to={'/main/settings/pass'} className={'list-item'}>Change password</NavLink>
                        <NavLink to={'/main/settings/email'} className={'list-item'}>Activate email</NavLink>
                    </ul>
                </nav>
                {(path === 'pass') ? <ChangePass/> : <Email/> }
            </div>
        </div>
    )
}

export function Settings() {
    const navigate = useNavigate()
    useEffect(() => {
        if (/settings$/.test(window.location.pathname)) navigate('pass')
    }, [])

    return(
        <Routes>
            <Route path={'/pass'} element={<Content path={'pass'}/>}></Route>
            <Route path={'/email'} element={<Content path={'email'}/>}></Route>
            <Route path={'/*'} element={<NoContent/>}></Route>
        </Routes>
    )
}