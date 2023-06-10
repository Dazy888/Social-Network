import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import { Analytics } from '@vercel/analytics/react';
// Styles
import '@/styles/main.scss'
import '@/styles/reset.scss'
// React Query
import { QueryClient, QueryClientProvider } from "react-query"
// Store
import { store } from "@/store/store"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
          <Analytics />
      </QueryClientProvider>
  )
}
