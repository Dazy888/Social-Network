import React, { Dispatch, SetStateAction } from "react"

interface Props {
    isNavOpened: boolean
    setNavState: Dispatch<SetStateAction<boolean>>
}

const NavBtnComponent: React.FC<Props> = ({ isNavOpened, setNavState }) => (
    <button onClick={() => setNavState((prevState) => !prevState)} className={'burger'}>
        <i className={`fa-solid fa-${isNavOpened ? 'square-xmark xmark' : 'bars bars'}`}/>
    </button>
)

export const NavBtn = React.memo(NavBtnComponent)
