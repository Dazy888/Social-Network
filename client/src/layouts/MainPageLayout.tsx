import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Head from "next/head"
import { useDispatch } from "react-redux"
import { useQuery } from "react-query"
import { LayoutProps } from "@/models/layouts.models"
// Components
import { NavLink } from "@/components/navigation/NavLink"
// Hooks
import { useAppSelector } from "@/hooks/redux"
// Service
import { AuthService } from "@/services/auth.service"
// Cookie functions
import { createCookie } from "@/layouts/AuthLayout"
// Store
import { setUser } from "@/store/reducers/ProfileSlice"
import { setSettingData } from "@/store/reducers/SettingsSlice"
import {notify} from "@/components/auth/AuthForm";

async function successfulLogout(router: any, dispatch: any) {
    createCookie('refreshToken', '', -1)
    createCookie('accessToken', '', -1)
    await router.push('/auth/sign-in')
    dispatch(setUser({ avatar: '', aboutMe: '', followers: [], following: [], posts: [], banner: '', hobbies: '', name: '', location: '', skills: '', id: '' }))
}

const MainPageLayout: React.FC<LayoutProps> = ({ children, title }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const avatar = useAppSelector(state => state.profileReducer.avatar)

    const [isNavOpened, setNavState] = useState(false)

    const { refetch:logout } = useQuery('logout', () => AuthService.logout(),
        {
            onSuccess: () => successfulLogout(router, dispatch),
            onError: () => notify('Logout has failed, try again', 'error'),
            enabled: false
        }
    )

    const { refetch:refresh } = useQuery('refresh', () => AuthService.refresh(),
        {
            onSuccess(res) {
                createCookie('accessToken', res.accessToken, 15 / (24 * 60))
                dispatch(setUser({ ...res.user, posts: res.posts }))
                dispatch(setSettingData({ email: res.user.email, isActivated: res.user.isActivated }))
            },
            onError: () => successfulLogout(router, dispatch)
        })

    useEffect(() => {
        setInterval(() => refresh(), 900000)
    }, [])

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div id={'app-wrapper'} className={'grid'}>
                <header className={'flex-center'}>
                    <div className={'header__content flex justify-between items-center'}>
                        <Image width={50} height={50} alt={'Logo'} src={'/logo.png'}/>
                        <nav className={`overflow-hidden duration-300 ${isNavOpened ? 'openNav' : ''}`}>
                            <button onClick={() => (isNavOpened) ? setNavState(false) : setNavState(true)} className={'burger'}>
                                <i className={`fa-solid fa-${isNavOpened ? 'square-xmark xmark' : 'bars bars'}`}/>
                            </button>
                            <ul className={'flex justify-between text-white'}>
                                <NavLink text={'Profile'} paths={['/profile']} activeClass={'active-page'}/>
                                <NavLink pathExp={/(\/users\/\d+|main\/profile\/\w+)/} text={'Users'} paths={['/users/1']} activeClass={'active-page'}/>
                                <NavLink pathExp={/(\/settings\/(activate|change-pass|profile))/} text={'Settings'} paths={['/settings/activate']} activeClass={'active-page'}/>
                            </ul>
                        </nav>
                        <div className={'header__logout flex justify-between items-center cursor-pointer overflow-hidden relative duration-500'}>
                            <img alt={'Avatar'} src={avatar} className={'rounded-full w-14 h-14'}/>
                            <button className={'text-xl absolute text-white'} onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                </header>
                <main className={'min-h-screen'}>
                    { children }
                </main>
            </div>
        </>
    )
}

export const MainPage = React.memo(MainPageLayout)
