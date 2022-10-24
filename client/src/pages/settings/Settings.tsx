import React, { useEffect } from "react"
// Navigation
import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
// CSS
import './styles/Settings.css'
// Components
import { ChangePass } from "./components/Change-Pass"
import Activate from "./components/Activate"

export function Settings() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('change-pass')
    }, [])

    return(
        <div className={'settings flex-property-set_center'}>
            <div className={'settings__container flex-property-set_between'}>
                <div className={'settings__sections flex-property-set_center'}>
                    <ul className={'settings__list'}>
                        <NavLink to={'change-pass'} className={'list-item'}>Change password</NavLink>
                        <NavLink to={'activate-email'} className={'list-item'}>Activate email</NavLink>
                    </ul>
                </div>
                <Routes>
                    <Route path={'/change-pass'} element={<ChangePass/>}/>
                    <Route path={'/activate-email'} element={<Activate/>}/>
                </Routes>
            </div>
        </div>
    )
}