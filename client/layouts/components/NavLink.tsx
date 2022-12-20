import Link from "next/link"
import { useRouter } from "next/router"

type PropsType = {
    path: string
    secondPath?: string
    thirdPath?: string
    className?: string
    activeClass?: string
    iconClass?: string
    text?: string
}

export function NavLink({ path, activeClass, className, iconClass, text, thirdPath = '', secondPath = '' }: PropsType) {
    const router = useRouter()

    return(
        <Link href={path} legacyBehavior={true}>
            <a className={router.pathname === path || router.pathname === secondPath || router.pathname === thirdPath  ? `${activeClass} ${className}` : className}>
                { text ? text : <i className={iconClass}></i>}
            </a>
        </Link>
    )
}