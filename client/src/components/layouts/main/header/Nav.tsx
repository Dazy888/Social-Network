import React, { useState } from "react"
import styles from '@/styles/MainLayout.module.scss'
import { NavBtn } from "@/components/layouts/main/header/NavBtn"
import { NavList } from "@/components/layouts/main/header/NavList"

const NavComponent = () => {
    const [isOpened, setIsOpened] = useState(false)

    return(
        <nav className={`duration-300 ${isOpened ? styles['opened-nav'] : ''}`}>
            <NavBtn {...{ isOpened, setIsOpened }} />
            <NavList />
        </nav>
    )
}

export const Nav = React.memo(NavComponent)
