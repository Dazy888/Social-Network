import React, { useEffect } from 'react'
// Navigation
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
// Components
import MainPage from "./pages/main/Main-Page";
import LoginPage from "./pages/login/Login-Page"
import {NoContent} from "./pages/404/No-Content"
// Redux
import { Provider, useDispatch } from "react-redux"
// Store
import store from "./store/store"
import { authActions } from "./store/reducers/auth/auth-reducer"
// React Query
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
// Service
import { AuthService } from "./services/AuthService"
import {profileActions} from "./store/reducers/profile/profile-reducer";
import {settingsActions} from "./store/reducers/settings/settings-reducer";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

function App() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const { refetch } = useQuery('check auth', () => AuthService.refresh(),
        {
            enabled: false,
            onSuccess(response) {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.accessToken)
                    dispatch(authActions.setAuthData(response.data.user.isAtivated, true))

                    const user = response.data.user
                    dispatch(profileActions.setUser(user.name, user.location, user.banner, user.avatar, user.aboutMe, user.skills, user.hobbies, user.id, response.data.posts, user.email))
                    dispatch(settingsActions.setEmail(user.email))

                    navigate('/main/profile')
                } else {
                    navigate('/login/sign-in')
                }
            }
        })

    useEffect( () => {
        if (localStorage.getItem('token')) {
            refetch()
        } else {
            navigate('/login/sign-in')
        }
    }, [])

    useEffect(() => {
        navigate(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
        window.onbeforeunload = () => window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
    }, [])

    function Redirect(): any {
        navigate('/main/profile')
    }

    return(
        <div>
            <Routes>
                <Route path={'/'} element={<Redirect />}></Route>
                <Route path={'/main/*'} element={<MainPage />}></Route>
                <Route path={'/login/*'} element={<LoginPage/>}></Route>
                <Route path={'*'} element={<NoContent/>}></Route>
            </Routes>
        </div>
    )
}

export default React.memo(function SocialNetwork() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </QueryClientProvider>
    )
})