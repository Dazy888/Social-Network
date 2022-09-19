import React, {useState} from "react"
// CSS
import '../styles/Profile.css'
// Components
import {Modal} from "./Modal"
// Types
import {User} from "../types/Types"
import {ContentPropsType} from "./Content"
// Store
import {useSelector} from "react-redux"
import {getId} from "../../../store/reducers/profile/profile-selectors"

export function Profile({banner, avatar, location, name, aboutMe, hobbies, skills, changeName, changeLocation, changeAvatar, changeBanner}: User & ContentPropsType) {
    const [modal, setModal] = useState(false)
    const id = useSelector(getId)

    return(
        <div>
            {modal ? <Modal currentAvatar={avatar} currentBanner={banner} id={id} changeBanner={changeBanner} changeAvatar={changeAvatar } changeName={changeName} changeLocation={changeLocation} currentLocation={location} currentName={name} setModalStatus={setModal}/> : null}
            <div className={'profile'}>
                <div className={'header'}>
                    <img alt={'Banner'} className={'header__banner'} src={banner}/>
                    <div className={'header__user'}>
                        <img alt={'Avatar'} className={'header__avatar'} src={avatar}/>
                        <p className={'header__name'}>{name}</p>
                        <p className={'header__location'}>{location}</p>
                    </div>
                    <div className={'header__tile'}></div>
                    <button onClick={() => setModal(true)} className={'header__settings'}><i className="fa-solid fa-gear"></i></button>
                </div>
                <div className={'main'}>
                    <div className={'information'}>
                        <h3>Profile Intro</h3>
                        <hr/>
                        <div className={'information__item'}>
                            <p className={'information__title'}>About Me</p>
                            <p className={'information__text'}>{aboutMe}</p>
                        </div>
                        <div className={'information__item'}>
                            <p className={'information__title'}>My Hobbies</p>
                            <p className={'information__text'}>{hobbies}</p>
                        </div>
                        <div className={'information__item'}>
                            <p className={'information__title'}>My Skills</p>
                            <p className={'information__text'}>{skills}</p>
                        </div>
                    </div>
                    <div className={'posts'}>

                    </div>
                    <div className={'photographs'}>
                        <h3>Last Photos</h3>
                        <hr/>

                    </div>
                </div>
            </div>
        </div>
    )
}