import React, { useState } from "react"
import { useDispatch } from "react-redux"
// Styles
import styles from "@/styles/Profile.module.scss"
// Components
import { InformationItem } from "@/components/profile/Information-Item"
// Store
import { profileActions } from "@/store/reducers/profile/profile-reducer"
// React Query
import { useMutation } from "react-query"
// Interfaces
import { EditInfoFunc, TextPropsI } from "@/interfaces/profile-interfaces"
import { AxiosResponse } from "axios"
// HTTP Service
import { ProfileService } from "@/services/profile-service"

interface Props {
    id?: string
    aboutMe: string
    skills: string
    hobbies: string
    forView?: boolean
    editInfo: EditInfoFunc
}

const InformationComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, editInfo, id }) => {
    const dispatch = useDispatch()
    const [editStatus, setEditStatus] = useState(false)

    const { mutateAsync:changeAboutMe } = useMutation('change about me', (data: TextPropsI) => ProfileService.changeAboutMe(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setAboutMe(response.data))
            }
        }
    )

    const { mutateAsync:changeHobbies } = useMutation('change hobbies', (data: TextPropsI) => ProfileService.changeHobbies(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setHobbies(response.data))
            }
        }
    )

    const { mutateAsync:changeSkills } = useMutation('change skills', (data: TextPropsI) => ProfileService.changeSkills(data.text, data.id),
        {
            onSuccess(response: AxiosResponse) {
                dispatch(profileActions.setSkills(response.data))
            }
        }
    )

    return(
        <div className={`${styles['information']} rounded-lg`}>
            <h3 className={'text-lg font-medium'}>Profile Intro</h3>
            <hr className={'w-full h-0.5'}/>
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'About Me'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'aboutMe'} text={aboutMe} changeText={changeAboutMe}/>
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'Skills'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'hobbies'} text={hobbies} changeText={changeHobbies}/>
            <InformationItem id={id} editInfo={editInfo} forView={forView} title={'Hobbies'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'skills'} text={skills} changeText={changeSkills}/>
        </div>
    )
}

export const Information = React.memo(InformationComponent)