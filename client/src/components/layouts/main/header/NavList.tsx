import React from "react"
import { NavLink } from "@/components/layouts/main/header/NavLink"

const NavListComponent = () => (
    <ul className={'flex text-white'}>
        <NavLink text={'Profile'} paths={['/profile']} />
        <NavLink pathExp={/(\/users\/\d+|\/profile\/\w+)/} text={'Users'} paths={['/users/1']} />
        <NavLink pathExp={/(\/settings\/(email|password|profile))/} text={'Settings'} paths={['/settings/email']} />
    </ul>
)

export const NavList = React.memo(NavListComponent)
