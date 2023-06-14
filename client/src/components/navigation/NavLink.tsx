import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface IProps {
    paths: string[]
    pathExp?: RegExp
    activeClass?: string
    iconClass?: string
    text?: string
}

const NavLinkComponent: React.FC<IProps> = ({ paths, activeClass, iconClass, text, pathExp = /123/ }) => {
    const router = useRouter()

    return(
        <Link href={paths[0]} legacyBehavior={true}>
            <a className={`${paths.includes(router.pathname) || pathExp.test(router.asPath) ? activeClass : ''} flex justify-center items-center`}>
                { text ? text : <i className={iconClass}/>}
            </a>
        </Link>
    )
}

export const NavLink = React.memo(NavLinkComponent)
