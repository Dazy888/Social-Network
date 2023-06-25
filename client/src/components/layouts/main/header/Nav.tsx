import React, {useState} from "react"
import { NavBtn } from "@/components/layouts/main/header/NavBtn"
import { NavList } from "@/components/layouts/main/header/NavList"

const NavComponent = () => {
    const [isNavOpened, setNavState] = useState(false)

    return(
        <nav className={`duration-300 ${isNavOpened ? 'openNav' : ''}`}>
            <NavBtn {...{ isNavOpened, setNavState }} />
            <NavList />
        </nav>
    )
}

export const Nav = React.memo(NavComponent)
