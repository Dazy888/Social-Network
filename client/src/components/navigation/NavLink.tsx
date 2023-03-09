import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface IProps {
    path: string
    pathExp?: RegExp
    secondPath?: string
    thirdPath?: string
    activeClass?: string
    iconClass?: string
    text?: string
}

const NavLinkComponent: React.FC<IProps> = ({ path, activeClass, iconClass, text, thirdPath, secondPath, pathExp = /123/ }) => {
    const router = useRouter()

    return(
        <Link href={path} legacyBehavior={true}>
            <a className={router.pathname === path || router.pathname === secondPath || router.pathname === thirdPath || pathExp.test(router.asPath)  ? `${activeClass} flex justify-center items-center` : 'flex justify-center items-center'}>
                { text ? text : <i className={iconClass}/>}
            </a>
        </Link>
    )
}

export const NavLink = React.memo(NavLinkComponent)
