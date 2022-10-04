// React items
import React, {useEffect} from 'react'
// Navigation
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
// Pages
import {LoginPage} from "./pages/login/Login-Page"
import MainPage from "./pages/main/Main-Page"
// Redux
import {connect, Provider} from "react-redux"
import store from "./store/store"
import {compose} from "redux"
// Reducers
import {checkAuth, login, logout, registration} from "./store/reducers/auth/auth-reducer"
import {
    addPost,
    auth,
    changeAboutMe,
    changeAvatar,
    changeBanner, changeHobbies,
    changeLocation,
    changeName, changeSkills, deletePost
} from "./store/reducers/profile/profile-reducer"
// Types
import {
    ActivateType,
    AddPost, CancelActivation,
    ChangeInfo,
    ChangeLocation,
    ChangeName,
    ChangePhoto, DeletePost,
    Login,
    Registration
} from "./pages/login/types/login-types"
import {User} from "./pages/main/types/Types"
import {activate, cancelActivation} from "./store/reducers/settings/settings-reducer";

type PropsType = {
    cancelActivation: CancelActivation
    activate: ActivateType
    deletePost: DeletePost
    addPost: AddPost
    changeAboutMe: ChangeInfo
    changeHobbies: ChangeInfo
    changeSkills: ChangeInfo
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    checkAuth: () => void
    logout: () => void
    changeName: ChangeName
    changeLocation: ChangeLocation
    auth: () => User
    login: Login
    registration: Registration
}

function App({checkAuth, cancelActivation, login, registration, logout, auth, changeLocation, changeName, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost, deletePost, activate}: PropsType) {
    let navigate = useNavigate()

    useEffect( () => {
        if (localStorage.getItem('token')) {
            checkAuth()
        } else {
            navigate('/login/sign-in')
        }
    }, [])

    useEffect(() => {
        navigate(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
        window.onbeforeunload = () => {
            window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
        }
    }, [])

    return(
        <div>
            <Routes>
                <Route path={'/*'} element={<MainPage cancelActivation={cancelActivation} activate={activate} deletePost={deletePost} addPost={addPost} changeAboutMe={changeAboutMe} changeHobbies={changeHobbies} changeSkills={changeSkills} changeAvatar={changeAvatar} changeBanner={changeBanner} changeLocation={changeLocation} changeName={changeName} auth={auth} logout={logout}/>}></Route>
                <Route path={'/login/*'} element={<LoginPage navigate={navigate} login={login} registration={registration}/>}></Route>
            </Routes>
        </div>
    )
}

let mapStateToProps
const SocialNetworkApp = compose<React.ComponentType>(connect(mapStateToProps, {login, registration, checkAuth, logout, auth, changeName, changeLocation, changeBanner, changeAvatar, changeAboutMe, changeHobbies, changeSkills, addPost, deletePost, activate, cancelActivation}))(App);

export const SocialNetwork: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <SocialNetworkApp/>
            </Provider>
        </BrowserRouter>
    )
}