import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
// Styles
import '@/styles/main.scss'
import '@/styles/reset.scss'
// React Query
import { QueryClient, QueryClientProvider } from "react-query"
// Store
import store from "../store/store"
// Apollo
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                  <Component {...pageProps} />
              </Provider>
          </QueryClientProvider>
      </ApolloProvider>
  )
}
