import React, {useMemo, useState} from "react"
// CSS
import './styles/Profile.css'
// Components
import Post from "./components/Post"
import InformationItem from "./components/Information-Item"
import {Modal} from "./components/Modal"
// Types
import {User} from "./types/Types"
import {ContentPropsType} from "./components/Content"
import {AddPost} from "../login/types/login-types"
// Store
import {useSelector} from "react-redux"
import {getId} from "../../store/reducers/profile/profile-selectors"

export default React.memo(function Profile({banner, posts, avatar, location, name, hobbies, aboutMe, skills, changeName, changeLocation, changeAvatar, changeBanner, changeHobbies, changeSkills, changeAboutMe, addPost, deletePost, subscriptions}: User & ContentPropsType) {
    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [newPostStatus, setNewPostStatus] = useState<boolean>(false)
    const [aboutMeStatus, setAboutMeStatus] = useState<boolean>(false)
    const [skillsStatus, setSkillsStatus] = useState<boolean>(false)
    const [hobbiesStatus, setHobbiesStatus] = useState<boolean>(false)
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const id = useSelector(getId)

    const postsElements = useMemo(() => [...posts].reverse().map((p) => <Post userId={id} id={p.id} deletePost={deletePost} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    function addNewPost(addPost: AddPost, setStatus: (status: boolean) => void) {
        const textarea: any = document.querySelector('textarea')
        addPost(textarea.value, id)
        setStatus(false)
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
                        <InformationItem editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe} status={aboutMeStatus} setStatus={setAboutMeStatus}/>
                        <InformationItem editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'hobbies'} text={hobbies} changeText={changeHobbies} status={hobbiesStatus} setStatus={setHobbiesStatus}/>
                        <InformationItem editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'skills'} text={skills} changeText={changeSkills} status={skillsStatus} setStatus={setSkillsStatus}/>
                    </div>
                    <div className={'posts'}>
                        {postsElements}
                        {newPostStatus
                        ? <div className={'posts__create'}>
                                <textarea maxLength={300}/>
                                <div className={'buttons flex-property-set_between'}>
                                    <button className={'submit'} onClick={(e) => addNewPost(addPost, setNewPostStatus)}>Submit</button>
                                    <button className={'cancel'} onClick={() => setNewPostStatus(false)}>Cancel</button>
                                </div>
                          </div>
                        : <div className={'posts__new-post'}>
                                <h3 className={'title'}>Add New Post</h3>
                                <button className={'add-post'} onClick={() => setNewPostStatus(true)}>
                                    <i className="fa-regular fa-square-plus"></i>
                                </button>
                            </div>
                        }
                    </div>
                    <div className={'subscriptions'}>
                        <h3 className={'title'}>Subscriptions ({subscriptions})</h3>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    )
})