import React from "react"
// Styles
import styles from '../styles/Settings.module.scss'
// Components
import { NavLink } from "../components/navigation/NavLink"
// Interfaces
import { LayoutPropsI } from "../interfaces/layouts-interfaces"

const SettingsPageLayout: React.FC<LayoutPropsI> = ({ children }) => {
    return(
        <div className={`${styles['settings']} flex-center`}>
            <div className={`${styles['settings__container']} flex-between`}>
                <nav className={'flex-center'}>
                    <ul>
                        <NavLink activeClass={'active_settings'} text={'Change password'} path={'/main/settings/change-pass'}/>
                        <NavLink activeClass={'active_settings'} className={'list-item'} text={'Activate e-mail'} path={'/main/settings/activate'}/>
                        <NavLink activeClass={'active_settings'} className={'list-item'} text={'Profile settings'} path={'/main/settings/profile'}/>
                    </ul>
                </nav>
                {children}
            </div>
        </div>
    )
}
export const SettingsPage = React.memo(SettingsPageLayout)