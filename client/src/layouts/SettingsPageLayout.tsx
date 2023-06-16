import React from "react"
import styles from '@/styles/Settings.module.scss'
import { NavLink } from "@/components/navigation/NavLink"
import { LayoutProps } from "@/models/layouts.models"
import {MainPage} from "@/layouts/MainPageLayout";

const SettingsPageLayout: React.FC<LayoutProps> = ({ children, title }) => {
    return(
        <MainPage title={title}>
            <div id={styles['settings']} className={'flex justify-center items-center h-full'}>
                <div className={`${styles['container']} flex justify-between items-center mx-auto`}>
                    <nav className={'flex justify-center items-center h-full rounded-2xl text-white font-medium text-xl'}>
                        <ul>
                            <NavLink activeClass={'active_settings'} text={'Change password'} paths={['/settings/change-pass']}/>
                            <NavLink activeClass={'active_settings'} text={'Activate e-mail'} paths={['/settings/activate']}/>
                            <NavLink activeClass={'active_settings'} text={'Profile settings'} paths={['/settings/profile']}/>
                        </ul>
                    </nav>
                    <div className={`${styles['content']} h-full rounded-2xl`}>
                        { children }
                    </div>
                </div>
            </div>
        </MainPage>
    )
}

export const SettingsPage = React.memo(SettingsPageLayout)
