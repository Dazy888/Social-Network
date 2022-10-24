import React, { useMemo, useRef, useState } from "react"
// CSS
import './styles/Profile.css'
// Components
import Post from "./components/Post"
import InformationItem from "./components/Information-Item"
import Modal from "./components/Modal"
// Store
import {connect, useDispatch, useSelector} from "react-redux"
import { getAboutMe, getAvatar, getBanner, getHobbies, getId, getLocation, getName, getPosts, getSkills } from "../../store/reducers/profile/profile-selectors"
import { compose } from "redux"
import { profileActions } from "../../store/reducers/profile/profile-reducer"
// Types
import { TextProps } from "./types/Profile-Types"
// React Query
import { useMutation } from "react-query"
// Service
import { ProfileService } from "../../services/ProfileService"

function ProfileComponent() {
    const dispatch = useDispatch()

    const textareaPostRef: any = useRef()

    const [modalStatus, setModalStatus] = useState<boolean>(false)

    const [newPostStatus, setNewPostStatus] = useState<boolean>(false)
    const [editStatus, setEditStatus] = useState<boolean>(false)

    const id = useSelector(getId)
    const posts = useSelector(getPosts)
    const avatar = useSelector(getAvatar)
    const banner = useSelector(getBanner)
    const name = useSelector(getName)
    const location = useSelector(getLocation)
    const aboutMe = useSelector(getAboutMe)
    const skills = useSelector(getSkills)
    const hobbies = useSelector(getHobbies)

    const postsElements = useMemo(() => [...posts].reverse().map((p, pos) => <Post key={pos} userId={id} id={p.id} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    const { mutateAsync:addPost } = useMutation('add post', (data: TextProps) => ProfileService.addPost(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.addNewPost(response.data))
            }
        }
    )

    async function addNewPost(setStatus: (status: boolean) => void) {
        await addPost({text: textareaPostRef.current.value, id})
        setStatus(false)
    }

    const { mutateAsync:changeAboutMe } = useMutation('change about me', (data: TextProps) => ProfileService.changeAboutMe(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.setAboutMe(response.data))
            }
        }
    )

    const { mutateAsync:changeHobbies } = useMutation('change hobbies', (data: TextProps) => ProfileService.changeHobbies(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.setHobbies(response.data))
            }
        }
    )

    const { mutateAsync:changeSkills } = useMutation('change skills', (data: TextProps) => ProfileService.changeSkills(data.text, data.id),
        {
            onSuccess(response) {
                dispatch(profileActions.setSkills(response.data))
            }
        }
    )

    return(
        <div>
            {modalStatus ? <Modal setModalStatus={setModalStatus}/> : null}
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
                        <InformationItem title={'About Me:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe}/>
                        <InformationItem title={'Skills:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'hobbies'} text={hobbies} changeText={changeHobbies}/>
                        <InformationItem title={'Hobbies:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'skills'} text={skills} changeText={changeSkills}/>
                    </div>
                    <div className={'posts'}>
                        {postsElements}
                        {newPostStatus
                        ? <div className={'posts__create'}>
                                <textarea maxLength={300} ref={textareaPostRef}/>
                                <div className={'buttons flex-property-set_between'}>
                                    <button className={'submit'} onClick={(e) => addNewPost(setNewPostStatus)}>Submit</button>
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
                        <h3 className={'title'}>Subscriptions 100</h3>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Profile = compose<React.ComponentType>(connect(null, {getAboutMe, getAvatar, getBanner, getHobbies, getId, getLocation, getName, getPosts, getSkills}))(React.memo(ProfileComponent))