import React from "react"
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { Analytics } from '@vercel/analytics/react'
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
// Store
import { store } from "@/store/store"
// Styles
import '@/styles/main.scss'
import '@/styles/reset.scss'
import 'react-toastify/dist/ReactToastify.css'
// Google Auth
import { GoogleOAuthProvider } from "@react-oauth/google"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <GoogleOAuthProvider clientId="392153644728-453pjkpt0d6e14lc2jri8e7sf8i1pr0s.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
            <Analytics />
            <ToastContainer />
        </QueryClientProvider>
    </GoogleOAuthProvider>
)

export default React.memo(App)
