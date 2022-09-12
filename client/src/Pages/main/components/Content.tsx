import {Route, Routes} from "react-router-dom"
import {Profile} from "./Profile"

type PropsType = {
    banner: string
    avatar: string
    name: string
    location: string
}

export function Content({avatar, banner, location, name}: PropsType) {
    return(
        <div id={'content'}>
            <Routes>
                <Route path={'/profile'} element={<Profile avatar={avatar} banner={banner} location={location} name={name}/>}/>
            </Routes>
        </div>
    )
}