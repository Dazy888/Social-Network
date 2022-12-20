import { useEffect } from "react"
// Redux
import {useDispatch, useSelector} from "react-redux"
// Navigation
import { useRouter } from "next/router"
// React Query
import { useQuery } from "react-query"
// Service
import { AuthService } from "../services/auth-service"
// Types
import { RefreshResponse } from "../models/auth-response"
import { AxiosResponse } from "axios"
// Store
import { authActions } from "../store/reducers/auth/auth-reducer"
import { profileActions } from "../store/reducers/profile/profile-reducer"
import { settingsActions } from "../store/reducers/settings/settings-reducer"
import { getAvatar } from "../store/reducers/profile/profile-selectors"
// Components
import { ProfileLoader } from "./components/Profile-Loader"
import { NavLink } from "./components/NavLink"

export function MainLayout({ children }: any) {
    const dispatch = useDispatch()
    const router = useRouter()
    const avatar = useSelector(getAvatar)

    const { refetch:logout } = useQuery('logout', () => AuthService.logout(),
        {
            enabled: false,
            onSuccess() {
                localStorage.removeItem('token')
                dispatch(authActions.setAuthData(false))
                router.push('/authorization/sign-in')
            }
        }
    )

    const { isLoading, refetch } = useQuery('check auth', () => AuthService.refresh(),
        {
             onSuccess(response: AxiosResponse<RefreshResponse>) {
                 const user = response.data.user
                 localStorage.setItem('token', response.data.accessToken)
                 dispatch(authActions.setAuthData(user.isActivated))
                 dispatch(profileActions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id, response.data.posts, user.email))
                 dispatch(settingsActions.setEmail(user.email))
            },
            onError() {
                 router.push('/authorization/sign-in')
            }
        })

    useEffect(() => {
        (!localStorage.getItem('token')) ? router.push('/authorization/sign-in') : refetch()
    }, [])

    return(
        <div id={'app-wrapper'}>
            <div id={'header'} className={'flex-center'}>
                <div className={'header__content flex-between'}>
                    <img alt={'Logo'} className={'header__logo'} src={'https://user-images.githubusercontent.com/16946573/144957680-01ea405e-959b-46b1-a163-df688466ac23.png'}/>
                    <nav>
                        <ul className={'flex-between'}>
                            <NavLink text={'Profile'} path={'/main/profile'} activeClass={'active-page'}/>
                            <NavLink text={'Users'} path={'/main/users'} activeClass={'active-page'}/>
                            <NavLink thirdPath={'/main/settings/profile'} secondPath={'/main/settings/change-pass'} text={'Settings'} path={'/main/settings/activate'} activeClass={'active-page'}/>
                        </ul>
                    </nav>
                    <div className={'header__logout flex-between'}>
                        <img alt={'Avatar'} src={avatar} className={'header__avatar'}/>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                </div>
            </div>
            <div id={'content'}>
                {!isLoading ? children : <ProfileLoader/>}
            </div>
        </div>
    )
}