import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { NavLink } from "./components/NavLink"
import styles from '../styles/Authorization.module.scss'

export function AuthorizationLayout({ children }: any) {
    const router = useRouter()
    const actions: any = useRef()

    useEffect(() => {
        if (localStorage.getItem('token')) router.push('/main/profile')
    }, [])

    function choseAction(event: any) {
        const activeAction = actions.current.querySelector('.active')
        if (activeAction) activeAction.classList.remove('active')
        event.target.classList.add('active')
    }

    return(
        <div className={`${styles['auth-wrapper']} flex-center`}>
            <div className={`${styles['auth']} flex-center`}>
                <div onClick={choseAction} className={styles['auth__actions']} ref={actions}>
                    <NavLink path={'/authorization/sign-in'} className={'flex-center'} activeClass={'active'} iconClass={'fa-solid fa-arrow-right-to-bracket'}/>
                    <NavLink path={'/authorization/sign-up'} className={'flex-center'} activeClass={'active'} iconClass={'fa-solid fa-address-card'}/>
                </div>
                <div className={`${styles['auth__content']} flex-center`}>
                    {children}
                </div>
            </div>
        </div>
    )
}