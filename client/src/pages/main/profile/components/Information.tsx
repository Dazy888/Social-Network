import React, { useState } from "react"
import { useDispatch } from "react-redux"
// Styles
// @ts-ignore
import styles from "../../../../styles/Profile.module.scss"
// Components
import { InformationItem } from "./Information-Item"
// Store
import { getId } from "../../../../store/reducers/profile/profile-selectors"
import { profileActions } from "../../../../store/reducers/profile/profile-reducer"
// React Query
import { useMutation } from "react-query"
// Typification
import {ChangeInfo, EditInfo, TextProps} from "../interfaces/interfaces"
import { AxiosResponse } from "axios"
// HTTP Service
import { ProfileService } from "../../../../services/profile-service"
interface Props {
    id?: string
    aboutMe: string
    skills: string
    hobbies: string
    forView?: boolean
    editInfo: EditInfo
}
const InformationComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, editInfo, id }) => {
    const dispatch = useDispatch()
    const [editStatus, setEditStatus] = useState<boolean>(false)

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
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'About Me:'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe}/>
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'Skills:'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'hobbies'} text={hobbies} changeText={changeHobbies}/>
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'Hobbies:'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'skills'} text={skills} changeText={changeSkills}/>
        </div>
    )
}
export const Information = React.memo(InformationComponent)