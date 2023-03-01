import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
// Components
import { NavLink } from "@/components/navigation/NavLink"
// Styles
import styles from '../styles/Authorization.module.scss'
// Store
import { getAvatar } from "@/store/reducers/profile/profile-selectors"
// Interfaces
import { LayoutPropsI } from "@/interfaces/layouts-interfaces"

const AuthorizationPageLayout: React.FC<LayoutPropsI> = ({ children }) => {
    const router = useRouter()
    const actions: any = useRef()
    const avatar = useSelector(getAvatar)

    useEffect(() => {
        if (localStorage.getItem('token') && avatar) router.push('/main/profile')
    }, [])

    function choseAction(event: any) {
        const activeAction = actions.current.querySelector('.active')
        if (activeAction) activeAction.classList.remove('active')
        event.target.classList.add('active')
    }

    return(
        <div className={`${styles['auth-wrapper']} flex justify-center items-center w-full min-h-screen`}>
            <div className={`${styles['auth']} flex justify-center items-center rounded-r-xl`}>
                <div onClick={choseAction} className={`${styles['auth__actions']} h-full w-2/12`} ref={actions}>
                    <NavLink path={'/authorization/sign-in'} activeClass={'active'} iconClass={'fa-solid fa-arrow-right-to-bracket'}/>
                    <NavLink path={'/authorization/sign-up'} activeClass={'active'} iconClass={'fa-solid fa-address-card'}/>
                </div>
                <div className={`${styles['auth__content']} flex justify-center w-10/12 relative`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export const AuthorizationPage = React.memo(AuthorizationPageLayout)