import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from '@/styles/MainLayout.module.scss'

interface IProps {
    paths: string[]
    text: string
    pathExp?: RegExp
}

const NavLinkComponent: React.FC<IProps> = ({ paths, text, pathExp = /fi123jclase123fa/ }) => {
    const router = useRouter()

    return(
        <li className={`text-xl duration-300 ${paths.includes(router.pathname) || pathExp.test(router.asPath) ? styles['active-page'] : ''}`}>
            <Link href={paths[0]}>{text}</Link>
        </li>
    )
}

export const NavLink = React.memo(NavLinkComponent)
