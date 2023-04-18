import React from "react"
// Styles
import styles from '@/styles/Settings.module.scss'
// Components
import { NavLink } from "@/components/navigation/NavLink"
// Interfaces
import { LayoutProps } from "@/models/layouts"

const SettingsPageLayout: React.FC<LayoutProps> = ({ children }) => {
    return(
        <div id={styles['settings']} className={'flex justify-center items-center h-full'}>
            <div className={`${styles['container']} flex justify-between items-center mx-auto`}>
                <nav className={'flex justify-center items-center h-full rounded-2xl text-white font-medium text-xl'}>
                    <ul>
                        <NavLink activeClass={'active_settings'} text={'Change password'} path={'/main/settings/change-pass'}/>
                        <NavLink activeClass={'active_settings'} text={'Activate e-mail'} path={'/main/settings/activate'}/>
                        <NavLink activeClass={'active_settings'} text={'Profile settings'} path={'/main/settings/profile'}/>
                    </ul>
                </nav>
                <div className={`${styles['content']} h-full rounded-2xl`}>
                    { children }
                </div>
            </div>
        </div>
    )
}

export const SettingsPage = React.memo(SettingsPageLayout)
