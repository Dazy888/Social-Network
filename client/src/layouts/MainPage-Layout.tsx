import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Head from "next/head"
import { useDispatch } from "react-redux"
import { useQuery } from "react-query"
import { AuthService } from "@/services/auth.service"
import { LayoutProps } from "@/models/layouts"
import { NavLink } from "@/components/navigation/NavLink"
import { useAppSelector } from "@/hooks/redux"
import {createCookie, getCookie} from "@/layouts/AuthPage-Layout"
// Store
import { setUser } from "@/store/reducers/ProfileSlice"
import { setSettingData } from "@/store/reducers/SettingsSlice"

const MainPageLayout: React.FC<LayoutProps> = ({ children, title }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const avatar = useAppSelector(state => state.profileReducer.avatar)

    const [isNavOpened, setNavState] = useState(false)

    const { refetch:logout } = useQuery('logout', () => AuthService.logout(),
        {
            onSuccess() {
                createCookie('refreshToken', '', -1)
                createCookie('accessToken', '', -1)
                dispatch(setUser({ avatar: '', aboutMe: '', followers: [], following: [], posts: [], banner: '', hobbies: '', name: '', location: '', skills: '', id: '' }))
                router.push('/auth/sign-in')
            },
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
            onError: () => router.push('/auth/sign-in')
        })

    useEffect(() => {
        (getCookie('refreshToken')) ? refresh() : router.push('/auth/sign-in')
    }, [])

    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div id={'app-wrapper'} className={'grid'}>
                <div id={'header'} className={'flex justify-center items-center'}>
                    <div className={'header__content flex justify-between items-center'}>
                        <Image width={50} height={50} alt={'Logo'} src={'/logo.png'}/>
                        <nav className={`overflow-hidden duration-300 ${isNavOpened ? 'openNav' : ''}`}>
                            <button onClick={() => (isNavOpened) ? setNavState(false) : setNavState(true)} className={'burger'}>
                                <i className={`fa-solid fa-${isNavOpened ? 'square-xmark xmark' : 'bars bars'}`}/>
                            </button>
                            <ul className={'flex justify-between text-white'}>
                                <NavLink text={'Profile'} path={'/main/profile'} activeClass={'active-page'}/>
                                <NavLink pathExp={/(main\/users\/\d+|main\/profile\/\w+)/} text={'Users'} path={'/main/users/1'} activeClass={'active-page'}/>
                                <NavLink thirdPath={'/main/settings/profile'} secondPath={'/main/settings/change-pass'} text={'Settings'} path={'/main/settings/activate'} activeClass={'active-page'}/>
                            </ul>
                        </nav>
                        <div className={'header__logout flex justify-between items-center cursor-pointer overflow-hidden relative duration-500'}>
                            <img alt={'Avatar'} src={avatar} className={'rounded-full w-14 h-14'}/>
                            <button className={'text-xl absolute text-white'} onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
                </div>
                <div id={'content'} className={'min-h-screen'}>
                    { children }
                </div>
            </div>
        </>
    )
}

export const MainPage = React.memo(MainPageLayout)
