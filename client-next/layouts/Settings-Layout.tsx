import { NavLink } from "./components/NavLink"
import styles from '../styles/Settings.module.scss'
export function SettingsLayout({ children }: any) {
    return(
        <div className={`${styles['settings']} flex-center`}>
            <div className={`${styles['settings__container']} flex-between`}>
                <nav className={'flex-center'}>
                    <ul>
                        <NavLink activeClass={'active_settings'} text={'Change password'} path={'/main/settings/change-pass'}/>
                        <NavLink activeClass={'active_settings'} className={'list-item'} text={'Activate email'} path={'/main/settings/activate'}/>
                    </ul>
                </nav>
                {children}
            </div>
        </div>
    )
}