import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import styles from '../styles/Authorization.module.scss'
import Link from "next/link"

type PropsType = {
    children: any
}

export function AuthorizationLayout({ children }: PropsType) {
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
                    <Link href={'/authorization/sign-in'} legacyBehavior={true}>
                        <a className={router.pathname === '/authorization/sign-in' ? 'active flex-center' : 'flex-center'}>
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </a>
                    </Link>
                    <Link href={'/authorization/sign-up'} className={'flex-center'} legacyBehavior={true}>
                        <a className={router.pathname === '/authorization/sign-up' ? 'active flex-center' : 'flex-center'}>
                            <i className="fa-solid fa-address-card"></i>
                        </a>
                    </Link>
                </div>
                <div className={`${styles['auth__content']} flex-center`}>
                    {children}
                </div>
            </div>
        </div>
    )
}