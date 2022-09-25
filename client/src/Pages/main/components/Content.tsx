import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {Profile} from "./Profile"
import {ProfileLoader} from "./Profile-Loader"
// Types
import {ChangeInfo, ChangeLocation, ChangeName, ChangePhoto} from "../../login/types/login-types"
import {useSelector} from "react-redux";
import {
    getAboutMe, getBanner,
    getHobbies,
    getLocation,
    getName,
    getSkills
} from "../../../store/reducers/profile/profile-selectors";

export type ContentPropsType = {
    changeAboutMe: ChangeInfo
    changeHobbies: ChangeInfo
    changeSkills: ChangeInfo
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    changeName: ChangeName
    changeLocation: ChangeLocation
    avatar: string
}

export function Content({avatar, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe}: ContentPropsType) {
    const name = useSelector(getName)
    const location = useSelector(getLocation)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)
    const banner = useSelector(getBanner)

    return(
        <div id={'content'}>
            {avatar
                ?   <Routes>
                        <Route path={'/profile'} element={<Profile changeSkills={changeSkills} changeHobbies={changeHobbies} changeAboutMe={changeAboutMe} changeBanner={changeBanner} changeAvatar={changeAvatar} changeLocation={changeLocation} changeName={changeName} aboutMe={aboutMe} hobbies={hobbies} skills={skills} avatar={avatar} banner={banner} location={location} name={name}/>}/>
                    </Routes>
                : <ProfileLoader/>}
        </div>
    )
}