import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface IProps {
    paths: string[]
    text: string
    pathExp?: RegExp
    activeClass?: string
    iconClass?: string
}

const NavLinkComponent: React.FC<IProps> = ({ paths, activeClass, iconClass, text, pathExp = /123/ }) => {
    const router = useRouter()

    return(
        <li>
            <Link href={paths[0]} legacyBehavior={true}>
                <a className={`${paths.includes(router.pathname) || pathExp.test(router.asPath) ? activeClass : ''} flex justify-center items-center`}>
                    { text ? text : <i className={iconClass}/>}
                </a>
            </Link>
        </li>
    )
}

export const NavLink = React.memo(NavLinkComponent)
