import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {Profile} from "./Profile"
import {ProfileLoader} from "./Profile-Loader"
// Types
import {User} from "../types/Types"
import {ChangeHeaderData} from "../../login/types/login-types"

export type ContentPropsType = {
    changeHeaderData: ChangeHeaderData
    changeBanner: (file: File) => void
}

export function Content({avatar, banner, location, name, aboutMe, hobbies, skills, changeHeaderData, changeBanner}: User & ContentPropsType) {
    return(
        <div id={'content'}>
            {avatar
                ?   <Routes>
                        <Route path={'/profile'} element={<Profile changeBanner={changeBanner} changeHeaderData={changeHeaderData} aboutMe={aboutMe} hobbies={hobbies} skills={skills} avatar={avatar} banner={banner} location={location} name={name}/>}/>
                    </Routes>
                : <ProfileLoader/>}
        </div>
    )
}