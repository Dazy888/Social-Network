import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import Profile from "./Profile"
import {ProfileLoader} from "./Profile-Loader"
// Types
import {AddPost, ChangeInfo, ChangeLocation, ChangeName, ChangePhoto} from "../../login/types/login-types"
// Store
import {useSelector} from "react-redux"
import {getAboutMe, getAvatar, getBanner, getHobbies, getLocation, getName, getPosts, getSkills} from "../../../store/reducers/profile/profile-selectors";

export type ContentPropsType = {
    addPost: AddPost
    changeAboutMe: ChangeInfo
    changeHobbies: ChangeInfo
    changeSkills: ChangeInfo
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export default React.memo(function Content({changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost}: ContentPropsType) {
    const avatar = useSelector(getAvatar)
    const name = useSelector(getName)
    const location = useSelector(getLocation)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const banner = useSelector(getBanner)
    const posts = useSelector(getPosts)

    return(
        <div id={'content'}>
            {avatar
            ?   <Routes>
                    <Route path={'/profile'} element={<Profile posts={posts} addPost={addPost} changeSkills={changeSkills} changeHobbies={changeHobbies} changeAboutMe={changeAboutMe} changeBanner={changeBanner} changeAvatar={changeAvatar} changeLocation={changeLocation} changeName={changeName} aboutMe={aboutMe} hobbies={hobbies} skills={skills} avatar={avatar} banner={banner} location={location} name={name}/>}/>
                </Routes>
                : <ProfileLoader/>}
        </div>
    )
})