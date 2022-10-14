import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {Profile} from "../../profile/Profile"
import {ProfileLoader} from "./Profile-Loader"
import {Settings} from "../../settings/Settings"
import {Users} from "../../users/Users"
import {NoContent} from "../../404/No-Content";

export type PropsType = {
    avatar: string
}

export default React.memo(function Content({avatar}: PropsType) {
    return(
        <div id={'content'}>
            {avatar
                ?   <Routes>
                        <Route path={'/profile'} element={<Profile />}/>
                        <Route path={'/settings/*'} element={<Settings/>}/>
                        {/*<Route path={'/users/*'} element={<Users/>}/>*/}
                    </Routes>
                :   <ProfileLoader/>}
        </div>
    )
})