// React
import React, {useEffect} from "react"
// Components
import Header from "./Header"
import Content from "./components/Content"
// Store
import {useSelector} from "react-redux"
import {getAvatar} from "../../store/reducers/profile/profile-selectors"
import {getAuthStatus} from "../../store/reducers/auth/auth-selectors"
// Types
import {User} from "./types/Types"
import {
    ActivateType,
    AddPost, CancelActivation,
    ChangeInfo,
    ChangeLocation,
    ChangeName,
    ChangePhoto,
    DeletePost,
} from "../login/types/login-types"
import {useNavigate} from "react-router-dom";

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
    logout: () => void
    auth: () => User
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export default React.memo(function MainPage({logout, auth, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost, deletePost, activate, cancelActivation}: PropsType) {
    const navigate = useNavigate()
    const avatar = useSelector(getAvatar)
    const isAuth = useSelector(getAuthStatus)

    useEffect(() => {
        if (!isAuth) {
            navigate('login/sign-in')
        } else {
            auth()
        }
    }, [isAuth])

    return(
        <div id={'app-wrapper'}>
            <Header avatar={avatar} logout={logout} />
            <Content cancelActivation={cancelActivation} activate={activate} deletePost={deletePost} addPost={addPost} changeAboutMe={changeAboutMe} changeHobbies={changeHobbies} changeSkills={changeSkills} changeAvatar={changeAvatar} changeBanner={changeBanner} changeName={changeName} changeLocation={changeLocation}/>
        </div>
    )
})