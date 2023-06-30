import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface Props {
    path: string
    activeClass: string
    iconClass: string | null
    text: string | null
}

const NavLinkComponent: React.FC<Props> = ({ activeClass, iconClass, path, text }) => {
    const router = useRouter()

    return(
        <li>
            <Link href={path} legacyBehavior={true}>
                <a className={`${(path === router.pathname) ? activeClass : ''} flex-center`}>
                    { text ? text : <i className={`fa-solid fa-${iconClass}`} />}
                </a>
            </Link>
        </li>
    )
}

export const NavLink = React.memo(NavLinkComponent)
