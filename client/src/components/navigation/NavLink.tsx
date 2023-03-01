import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface PropsI {
    path: string
    secondPath?: string
    thirdPath?: string
    activeClass?: string
    iconClass?: string
    text?: string
}

const NavLinkComponent: React.FC<PropsI> = ({ path, activeClass, iconClass, text, thirdPath = '', secondPath = '' }) => {
    const router = useRouter()

    return(
        <Link href={path} legacyBehavior={true}>
            <a className={router.pathname === path || router.pathname === secondPath || router.pathname === thirdPath  ? `${activeClass} flex justify-center items-center` : 'flex justify-center items-center'}>
                { text ? text : <i className={iconClass}/>}
            </a>
        </Link>
    )
}

export const NavLink = React.memo(NavLinkComponent)