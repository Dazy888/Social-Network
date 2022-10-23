import React, { useEffect } from 'react'
// Navigation
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
// Components
import { LoginPage } from "./pages/login/Login-Page"
import { MainPage } from "./pages/main/Main-Page"
import { NoContent } from "./pages/404/No-Content";
// Redux
import { connect, Provider } from "react-redux"
import store from "./store/store"
import { compose } from "redux"
import { checkAuth } from "./store/reducers/auth/auth-reducer"
// React Query
import {QueryClient, QueryClientProvider, useQuery} from "react-query"
import {AuthService} from "./services/AuthService";

type PropsType = {
    checkAuth: () => void
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})
function App({checkAuth}: PropsType) {
    let navigate = useNavigate()
    const {refetch} = useQuery('check auth', () => AuthService.refresh(),
        {
            enabled: false,
            onSuccess(response) {
                console.log(response)
                if (response.status === 200) {

                } else {

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

const SocialNetworkApp = compose<React.ComponentType>(connect(null, {checkAuth}))(App)

export default React.memo(function SocialNetwork() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>
                    <SocialNetworkApp/>
                </Provider>
            </BrowserRouter>
        </QueryClientProvider>
    )
})