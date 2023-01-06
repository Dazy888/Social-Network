import type { AppProps } from 'next/app'
// Styles
import '../styles/index.scss'
// React Query
import { QueryClient, QueryClientProvider } from "react-query"
// Redux
import { Provider } from "react-redux"
// Store
import store from "../store/store"

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
      </QueryClientProvider>
  )
}