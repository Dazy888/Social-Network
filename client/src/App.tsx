import React, { useEffect } from 'react'
// Navigation
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
// Components
import MainPage from "./pages/main/Main-Page"
import LoginPage from "./pages/login/Login-Page"
import { NoContent } from "./pages/404/NoContent"
// Redux
import { Provider } from "react-redux"
// Store
import store from "./store/store"
// React Query
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false }
    }
})

function App() {
    let navigate = useNavigate()

    useEffect( () => {
        if (!localStorage.getItem('token')) navigate('/login/sign-in')
    }, [])

    function Redirect(): any {
        useEffect(() => navigate('/main/profile'), [])
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