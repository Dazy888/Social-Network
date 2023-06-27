import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from '@/styles/MainLayout.module.scss'
import { Nav } from "@/components/layouts/main/header/Nav"
import { Logout } from "@/components/layouts/main/header/Logout"

const HeaderComponent = () => {
    const router = useRouter()

    return(
        <header className={'flex justify-between items-center py-3 px-10 relative'}>
            <Image onClick={() => router.push('/profile')} className={`${styles.logo} cursor-pointer`} width={50} height={50} alt={'Logo'} src={'/logo.png'}/>
            <Nav />
            <Logout />
        </header>
    )
}

export const Header = React.memo(HeaderComponent)
