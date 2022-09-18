import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {Profile} from "./Profile"
import {ProfileLoader} from "./Profile-Loader"
// Types
import {User} from "../types/Types"
import {ChangeLocation, ChangeName, ChangePhoto} from "../../login/types/login-types"

export type ContentPropsType = {
    changeBanner: ChangePhoto
    changeAvatar: ChangePhoto
    changeName: ChangeName
    changeLocation: ChangeLocation
}

export function Content({avatar, banner, location, name, aboutMe, hobbies, skills, changeName, changeLocation, changeAvatar, changeBanner}: User & ContentPropsType) {
    return(
        <div id={'content'}>
            {avatar
                ?   <Routes>
                        <Route path={'/profile'} element={<Profile changeBanner={changeBanner} changeAvatar={changeAvatar} changeLocation={changeLocation} changeName={changeName} aboutMe={aboutMe} hobbies={hobbies} skills={skills} avatar={avatar} banner={banner} location={location} name={name}/>}/>
                    </Routes>
                : <ProfileLoader/>}
        </div>
    )
}