import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {Provider, useSelector} from "react-redux"
// Components
import {Header} from "./Components/Header"
import {SideBar} from "./Components/Side-Bar"
import {Content} from "./Components/Content"
import {LoginPage} from "./Pages/Login-Page"

export function App() {
    const authStatus = false

    if (authStatus) {
        return (
            <div id={'app-wrapper'}>
                <Header />
                <SideBar />
                <Content />
            </div>
        )
    } else {
        return (
            <div id={'wrapper'}>
                <LoginPage />
            </div>
        )
    }
}

// export function SocialNetwork() {
//   return (
//       <BrowserRouter>
//         <Provider store={}>
//           <App/>
//         </Provider>
//       </BrowserRouter>
//   )
// }