import React from "react"
import Image from "next/image"
import styles from '@/styles/MainLayout.module.scss'
import { Nav } from "@/components/layouts/main/header/Nav"
import { Logout } from "@/components/layouts/main/header/Logout"

const HeaderComponent = () => (
    <header className={'flex justify-between items-center py-3 px-10 relative'}>
        <Image className={styles.logo} width={50} height={50} alt={'Logo'} src={'/logo.png'}/>
        <Nav />
        <Logout />
    </header>
)

export const Header = React.memo(HeaderComponent)
