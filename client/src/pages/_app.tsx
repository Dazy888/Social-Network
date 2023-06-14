import React from "react"
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { Analytics } from '@vercel/analytics/react'
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
import { store } from "@/store/store"
import '@/styles/main.scss'
import '@/styles/reset.scss'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
        <Analytics />
        <ToastContainer />
    </QueryClientProvider>
)

export default React.memo(App)
