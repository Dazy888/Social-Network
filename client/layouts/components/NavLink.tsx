import Link from "next/link"
import { useRouter } from "next/router"

type PropsType = {
    path: string
    className?: string
    activeClass?: string
    iconClass?: string
    text?: string
}

export function NavLink({ path, activeClass, className, iconClass, text }: PropsType) {
    const router = useRouter()

    return(
        <Link href={path} legacyBehavior={true}>
            <a className={router.pathname === path ? `${activeClass} ${className}` : className}>
                { text ? text : <i className={iconClass}></i>}
            </a>
        </Link>
    )
}