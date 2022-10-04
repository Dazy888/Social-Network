import {NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import './styles/Settings.css'
import {ChangePass} from "./components/Change-Pass";
import {ActivateType, CancelActivation} from "../login/types/login-types";
import { Activate } from "./components/Activate";

type PropsType = {
    cancelActivation: CancelActivation | any
    activate: ActivateType | any
}

export function Settings({activate, cancelActivation}: PropsType) {
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
                    <Route path={'/activate-email'} element={<Activate cancelActivation={cancelActivation} activate={activate}/>}/>
                </Routes>
            </div>
        </div>
    )
}