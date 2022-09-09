import React from "react"
import '../styles/Header.css'

type PropsType = {
    logout: () => void
    avatar?: string
}

export function Header({avatar = 'https://i.imgur.com/b08hxPY.png', logout}: PropsType) {
    return (
        <div id={'header'} className={'flex-property-set_center'}>
            <div className={'header__content flex-property-set_between'}>
                <img alt={'Logo'} className={'header__logo'} src={'https://user-images.githubusercontent.com/16946573/144957680-01ea405e-959b-46b1-a163-df688466ac23.png'}/>
                <div className={'header__logout flex-property-set_between'}>
                    <img alt={'Avatar'} src={avatar} className={'header__avatar'}/>
                    <button className={'header__btn'} onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}