import Link from "next/link"
import { useRouter } from "next/router"

type PropsType = {
    path: string
    className?: string
    activeClass: string
    iconClass?: string
}

export function NavLink({ path, activeClass, className, iconClass }: PropsType) {
    const router = useRouter()

    return(
        <Link href={path} legacyBehavior={true}>
            <a className={router.pathname === path ? `${activeClass} ${className}` : className}>
                <i className={iconClass}></i>
            </a>
        </Link>
    )
}