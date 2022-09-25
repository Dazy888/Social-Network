import React, {useEffect, useState} from "react"
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
import {ChangeInfo} from "../../login/types/login-types";

export function Profile({banner, avatar, location, name, hobbies, aboutMe, skills, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe}: User & ContentPropsType) {
    const [modal, setModal] = useState(false)
    const id = useSelector(getId)

    function editInfo(e: any, changeText: ChangeInfo, value: string, textId: string) {
        const block = e.target.closest('.information__item')
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.maxLength = 100

        textarea.onblur = () => {
            const text = document.createElement('p')
            text.className = 'text'
            text.id = textId
            block.append(text)
            textarea.remove()
            changeText(textarea.value, id)
            text.innerText = textarea.value
        }

        block.querySelector('.text').remove()
        block.append(textarea)
    }

    function addPost(e: any) {
        const block = e.target.closest('.posts')
        const textarea = document.createElement('textarea')
        block.append(textarea)
        e.target.remove()
    }

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
                <div className={'main flex-property-set_between'}>
                    <div className={'information'}>
                        <h3 className={'title'}>Profile Intro</h3>
                        <hr/>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>About Me:</p>
                                <i className="fa-solid fa-pen" onClick={e => editInfo(e, changeAboutMe, aboutMe, 'aboutMe')}></i>
                            </div>
                            <p className={'text'} id={'aboutMe'}>{aboutMe}</p>
                        </div>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>My Hobbies:</p>
                                <i className="fa-solid fa-pen" onClick={e => editInfo(e, changeHobbies, hobbies, 'hobbies')}></i>
                            </div>
                            <p className={'text'} id={'hobbies'}>{hobbies}</p>
                        </div>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>My Skills:</p>
                                <i className="fa-solid fa-pen" onClick={e => editInfo(e, changeSkills, skills, 'skills')}></i>
                            </div>
                            <p className={'text'} id={'skills'}>{skills}</p>
                        </div>
                    </div>
                    <div className={'posts'}>
                        <button className={'add-post'} onClick={(e) => addPost(e)}>
                            <i className="fa-regular fa-square-plus"></i>
                        </button>
                    </div>
                    <div className={'photographs__friends'}>
                        <div className={'photographs'}>
                            <h3>Last Photos</h3>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}