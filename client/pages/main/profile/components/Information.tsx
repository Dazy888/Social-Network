import { useState } from "react"
// Styles
import styles from "../../../../styles/Profile.module.scss"
// Components
import InformationItem from "./Information-Item"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Store
import { getId } from "../../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../../store/reducers/profile/profile-reducer"
// React Query
import { useMutation } from "react-query"
// Types
import { TextProps } from "../types/profile-types"
import { AxiosResponse } from "axios"
// Service
import { ProfileService } from "../../../../services/profile-service"

type PropsType = {
    aboutMe: string
    skills: string
    hobbies: string
    forView?: boolean
}
export function Information({ aboutMe, hobbies, skills, forView = false }: PropsType) {
    const dispatch = useDispatch()
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const id = useSelector(getId)

    const { mutateAsync:changeAboutMe } = useMutation('change about me', (data: TextProps) => ProfileService.changeAboutMe(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setAboutMe(response.data))
            }
        }
    )

    const { mutateAsync:changeHobbies } = useMutation('change hobbies', (data: TextProps) => ProfileService.changeHobbies(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setHobbies(response.data))
            }
        }
    )

    const { mutateAsync:changeSkills } = useMutation('change skills', (data: TextProps) => ProfileService.changeSkills(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setSkills(response.data))
            }
        }
    )

    return(
        <div className={styles['information']}>
            <h3 className={styles['title']}>Profile Intro</h3>
            <hr/>
            <InformationItem forView={forView} title={'About Me:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe}/>
            <InformationItem forView={forView} title={'Skills:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'hobbies'} text={hobbies} changeText={changeHobbies}/>
            <InformationItem forView={forView} title={'Hobbies:'} editStatus={editStatus} setEditStatus={setEditStatus} id={id} textId={'skills'} text={skills} changeText={changeSkills}/>
        </div>
    )
}