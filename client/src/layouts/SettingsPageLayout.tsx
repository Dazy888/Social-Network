import React from "react"
import styles from '@/styles/Settings.module.scss'
import { LayoutProps } from "@/models/layouts.models"
import { MainPage } from "@/layouts/MainPageLayout"
import { NavLink } from "@/components/navigation/NavLink"

const SettingsPageLayout: React.FC<LayoutProps> = ({ children, title }) => (
    <MainPage title={title}>
        <div id={styles['settings']} className={'flex justify-center items-center h-full'}>
            <div className={`${styles['container']} flex justify-between items-center mx-auto`}>
                <nav className={'flex justify-center items-center h-full rounded-md text-white font-medium text-xl'}>
                    <ul>
                        <NavLink activeClass={'active_settings'} text={'Change password'} paths={['/settings/change-pass']}/>
                        <NavLink activeClass={'active_settings'} text={'Activate e-mail'} paths={['/settings/activate']}/>
                        <NavLink activeClass={'active_settings'} text={'Profile settings'} paths={['/settings/profile']}/>
                    </ul>
                </nav>
                <div className={`${styles['content']} h-full rounded-md`}>
                    { children }
                </div>
            </div>
        </div>
    </MainPage>
)

export const SettingsPage = React.memo(SettingsPageLayout)
