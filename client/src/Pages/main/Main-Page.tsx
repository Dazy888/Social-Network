// React
import React, {useEffect} from "react"
// Components
import Header from "./components/Header"
import Content from "./components/Content"
// Store
import {useSelector} from "react-redux"
import {getAvatar} from "../../store/reducers/profile/profile-selectors"
import {getAuthStatus} from "../../store/reducers/auth/auth-selectors"
// Types
import {User} from "./types/Types"
import {
    AddPost,
    ChangeInfo,
    ChangeLocation,
    ChangeName,
    ChangePhoto,
    DeletePost,
    Navigate
} from "../login/types/login-types"

type PropsType = {
    deletePost: DeletePost
    addPost: AddPost
    changeAboutMe: ChangeInfo
    changeHobbies: ChangeInfo
    changeSkills: ChangeInfo
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    navigate: Navigate
    logout: () => void
    auth: () => User
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export default React.memo(function MainPage({logout, auth, navigate, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost, deletePost}: PropsType) {
    const avatar = useSelector(getAvatar)
    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        if (!isAuth) navigate('login/sign-in')
        auth()
    }, [isAuth])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <Content deletePost={deletePost} addPost={addPost} changeAboutMe={changeAboutMe} changeHobbies={changeHobbies} changeSkills={changeSkills} changeAvatar={changeAvatar} changeBanner={changeBanner} changeName={changeName} changeLocation={changeLocation}/>
        </div>
    )
})