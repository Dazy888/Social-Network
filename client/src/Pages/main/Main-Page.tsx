// React
import React, {useEffect} from "react"
// Components
import {Header} from "./components/Header"
import {Content} from "./components/Content"
// Navigation
import {User} from "./types/Types"
import {useSelector} from "react-redux";
import {getAvatar, getBanner, getUserLocation, getUserName} from "../../store/reducers/profile/profile-selectors";

type PropsType = {
    logout: () => void
    auth: () => User
}

export function MainPage({logout, auth}: PropsType) {
    const banner = useSelector(getBanner)
    const avatar = useSelector(getAvatar)
    const name = useSelector(getUserName)
    const location = useSelector(getUserLocation)

    useEffect(() => {
        auth()
    }, [])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <Content banner={banner} location={location} name={name} avatar={avatar}/>
        </div>
    )
}