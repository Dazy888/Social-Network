import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
// React Query
import { useQuery } from "react-query"
// Service
import { AuthService } from "@/services/auth-service"
// Interfaces
import { RefreshResponse } from "@/models/auth-responses"
import { AxiosResponse } from "axios"
import { LayoutPropsI } from "@/interfaces/layouts-interfaces"
// Store
import { authActions } from "@/store/reducers/auth/auth-reducer"
import { profileActions } from "@/store/reducers/profile/profile-reducer"
import { settingsActions } from "@/store/reducers/settings/settings-reducer"
import { getAvatar } from "@/store/reducers/profile/profile-selectors"
// Components
import { NavLink } from "@/components/navigation/NavLink"
import Image from "next/image";

const MainPageLayout: React.FC<LayoutPropsI> = ({ children }) => {
    const navRef: any = useRef()
    const dispatch = useDispatch()
    const router = useRouter()

    const avatar = useSelector(getAvatar)
    const [opened, setStatus] = useState(false)

    function openNavigation() {
        if (opened) {
            setStatus(false)
            navRef.current.classList.remove('openNav')
        } else {
            setStatus(true)
            navRef.current.classList.add('openNav')
        }
    }

    const { refetch:logout } = useQuery('logout', () => AuthService.logout(),
        {
            async onSuccess() {
                localStorage.removeItem('token')
                dispatch(authActions.setAuthData(false))
                await router.push('/authorization/sign-in')
            },
            enabled: false
        }
    )

    const { refetch:refresh } = useQuery('check auth', () => AuthService.refresh(),
        {
            onSuccess(response: AxiosResponse<RefreshResponse>) {
                const user = response.data.user
                localStorage.setItem('token', response.data.tokens.accessToken)
                dispatch(authActions.setAuthData(user.isActivated))
                dispatch(profileActions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.userId, response.data.posts, user.email, user.followers, user.following))
                dispatch(settingsActions.setEmail(user.email))
            },
            async onError() {
                await router.push('/authorization/sign-in')
            }
        })

    useEffect(() => {
        (!localStorage.getItem('token')) ? router.push('/authorization/sign-in') : refresh()
    }, [refresh, router])

    return(
        <div id={'app-wrapper'} className={'grid'}>
            <div id={'header'} className={'flex justify-center items-center'}>
                <div className={'header__content flex justify-between items-center'}>
                    <Image width={50} height={50} alt={'Logo'} src={'/logo.png'}/>
                    <nav ref={navRef} className={'overflow-hidden duration-300'}>
                        <button onClick={openNavigation} className={'burger'}>
                            {opened ? <i className={'fa-solid fa-square-xmark xmark'}/> : <i className={'fa-solid fa-bars bars'}/> }
                        </button>
                        <ul className={'flex justify-between text-white'}>
                            <NavLink text={'Profile'} path={'/main/profile'} activeClass={'active-page'}/>
                            <NavLink pathExp={/main\/users\/\d+/} text={'Users'} path={'/main/users/1'} activeClass={'active-page'}/>
                            <NavLink thirdPath={'/main/settings/profile'} secondPath={'/main/settings/change-pass'} text={'Settings'} path={'/main/settings/activate'} activeClass={'active-page'}/>
                        </ul>
                    </nav>
                    <div className={'header__logout flex justify-between items-center cursor-pointer overflow-hidden relative duration-500'}>
                        <img alt={'Avatar'} src={avatar} className={'rounded-full w-14 h-14'}/>
                        <button className={'text-xl absolute'} onClick={() => logout()}>Logout</button>
                    </div>
                </div>
            </div>
            <div id={'content'} className={'min-h-screen'}>
                {children}
            </div>
        </div>
    )
}

export const MainPage = React.memo(MainPageLayout)