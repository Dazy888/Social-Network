import React, {useMemo, useState} from "react"
// CSS
import '../styles/Profile.css'
// Components
import Post from "./Post"
import {Modal} from "./Modal"
// Types
import {User} from "../types/Types"
import {ContentPropsType} from "./Content"
import {ChangeInfo} from "../../login/types/login-types"
// Store
import {useSelector} from "react-redux"
import {getId} from "../../../store/reducers/profile/profile-selectors"

export default React.memo(function Profile({banner, posts, avatar, location, name, hobbies, aboutMe, skills, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost}: User & ContentPropsType) {
    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [aboutMeStatus, setAboutMeStatus] = useState<boolean>(false)
    const [skillsStatus, setSkillsStatus] = useState<boolean>(false)
    const [hobbiesStatus, setHobbiesStatus] = useState<boolean>(false)
    const id = useSelector(getId)

    const postsElements = useMemo(() => [...posts].reverse().map((p) => <Post avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    function editInfo(event: any, changeText: ChangeInfo, value: string, textId: string, setEditStatus: (status: boolean) => void) {
        setEditStatus(true)
        const block = event.target.closest('.information__item')
        const text = block.querySelector(`#${textId}`)
        let textarea: any

        setTimeout(() => {
            textarea = block.querySelector('textarea')
            textarea.value = value
            textarea.onblur = sendText
        }, 1)

        function sendText() {
            changeText(textarea.value, id)
            text.innerText = textarea.value
            document.onkeydown = null
            setEditStatus(false)
        }

        document.onkeydown = (e) => {
            if (e.code === 'Enter') sendText()
        }
    }

    function addNewPost(e: any) {
        const block = e.target.closest('.posts')
        const addPostBlock = block.querySelector('.posts__new-post')
        const textarea = document.createElement('textarea')
        textarea.maxLength = 300

        block.append(textarea)
        block.querySelector('.posts__new-post').remove()

        function sendText() {
            addPost(textarea.value, id)
            textarea.remove()
            block.append(addPostBlock)
            document.onkeydown = null
        }

        textarea.onblur = sendText

        document.onkeydown = (e) => {
            if (e.code === 'Enter') sendText()
        }
    }

    return(
        <div>
            {modalStatus ? <Modal currentAvatar={avatar} currentBanner={banner} id={id} changeBanner={changeBanner} changeAvatar={changeAvatar } changeName={changeName} changeLocation={changeLocation} currentLocation={location} currentName={name} setModalStatus={setModalStatus}/> : null}
            <div className={'profile'}>
                <div className={'header'}>
                    <img alt={'Banner'} className={'header__banner'} src={banner}/>
                    <div className={'header__user'}>
                        <img alt={'Avatar'} className={'header__avatar'} src={avatar}/>
                        <p className={'header__name'}>{name}</p>
                        <p className={'header__location'}>{location}</p>
                    </div>
                    <div className={'header__tile'}></div>
                    <button onClick={() => setModalStatus(true)} className={'header__settings'}><i className="fa-solid fa-gear"></i></button>
                </div>
                <div className={'main flex-property-set_between'}>
                    <div className={'information'}>
                        <h3 className={'title'}>Profile Intro</h3>
                        <hr/>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>About Me:</p>
                                <button disabled={aboutMeStatus} onClick={e => editInfo(e, changeAboutMe, aboutMe, 'aboutMe', setAboutMeStatus)} className={'information__btn'}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                            </div>
                            {aboutMeStatus
                                ? <textarea maxLength={100}/>
                                : <p className={'text'} id={'aboutMe'}>{aboutMe}</p>
                            }
                        </div>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>My Hobbies:</p>
                                <button disabled={hobbiesStatus} onClick={e => editInfo(e, changeHobbies, hobbies, 'hobbies', setHobbiesStatus)} className={'information__btn'}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                            </div>
                            {hobbiesStatus
                                ? <textarea maxLength={100}/>
                                : <p className={'text'} id={'hobbies'}>{hobbies}</p>
                            }
                        </div>
                        <div className={'information__item'}>
                            <div className={'information__title flex-property-set_between'}>
                                <p className={'information__title'}>My Skills:</p>
                                <button disabled={skillsStatus} onClick={e => editInfo(e, changeSkills, skills, 'skills', setSkillsStatus)} className={'information__btn'}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                            </div>
                            {skillsStatus
                                ? <textarea maxLength={100}/>
                                : <p className={'text'} id={'skills'}>{skills}</p>
                            }
                        </div>
                    </div>
                    <div className={'posts'}>
                        {postsElements}
                        <div className={'posts__new-post'}>
                            <h3 className={'title'}>Add New Post</h3>
                            <button className={'add-post'} onClick={(e) => addNewPost(e)}>
                                <i className="fa-regular fa-square-plus"></i>
                            </button>
                        </div>
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
})