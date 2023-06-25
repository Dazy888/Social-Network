import React, {Dispatch, SetStateAction, useState} from "react"
import styles from '@/styles/MainLayout.module.scss'

interface Props {
    isOpened: boolean
    setIsOpened: Dispatch<SetStateAction<boolean>>
}

const NavBtnComponent: React.FC<Props> = ({ isOpened, setIsOpened }) => {
    const [isAnimation, setIsAnimation] = useState(false)

    function clickListener() {
        setTimeout(() => setIsOpened((prevState) => !prevState), 150)
        setIsAnimation(true)
        setTimeout(() => setIsAnimation(false), 300)
    }

    return(
        <button onClick={clickListener} className={`hidden mx-auto text-3xl text-white mb-5 ${isAnimation ? styles['animate-btn'] : ''}`} >
            <i className={`fa-solid fa-${isOpened ? 'square-xmark' : 'bars'}`}/>
        </button>
    )
}

export const NavBtn = React.memo(NavBtnComponent)
