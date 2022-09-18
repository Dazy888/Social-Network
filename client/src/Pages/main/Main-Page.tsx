// React
import React, {useEffect} from "react"
// Components
import {Header} from "./components/Header"
import {Content} from "./components/Content"
// Store
import {useSelector} from "react-redux"
import {
    getAboutMe,
    getAvatar,
    getBanner, getHobbies, getLocation,
    getName, getSkills,
} from "../../store/reducers/profile/profile-selectors"
import {getAuthStatus} from "../../store/reducers/auth/auth-selectors"
// Types
import {User} from "./types/Types"
import {ChangeLocation, ChangeName, ChangePhoto, Navigate} from "../login/types/login-types"

type PropsType = {
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    navigate: Navigate
    logout: () => void
    auth: () => User
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export function MainPage({logout, auth, navigate, changeName, changeLocation, changeAvatar, changeBanner}: PropsType) {
    const banner = useSelector(getBanner)
    const avatar = useSelector(getAvatar)
    const name = useSelector(getName)
    const location = useSelector(getLocation)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        if (!isAuth) navigate('login/sign-in')
        auth()
    }, [isAuth])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <Content changeAvatar={changeAvatar} changeBanner={changeBanner} changeName={changeName} changeLocation={changeLocation} skills={skills} aboutMe={aboutMe} hobbies={hobbies} banner={banner} location={location} name={name} avatar={avatar}/>
        </div>
    )
}