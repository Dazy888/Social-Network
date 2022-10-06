import React from "react"
// Navigation
import {Route, Routes} from "react-router-dom"
// Components
import {Profile} from "../../profile/Profile"
import {ProfileLoader} from "./Profile-Loader"
import {Settings} from "../../settings/Settings"

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
                    </Routes>
                :   <ProfileLoader/>}
        </div>
    )
})