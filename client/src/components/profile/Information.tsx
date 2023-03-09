import React, { useState } from "react"
import { useDispatch } from "react-redux"
// Styles
import styles from "@/styles/Profile.module.scss"
// Components
import { InformationItem } from "@/components/profile/InformationItem"
// Store
import { profileActions } from "@/store/reducers/profile/profile.reducer"
// React Query
import { useMutation } from "react-query"
// Interfaces
import { EditInfoFunc, TextProps } from "@/interfaces/profile.interfaces"
// HTTP Service
import { ProfileService } from "@/services/profile.service"

interface IProps {
    userId?: string
    aboutMe: string
    skills: string
    hobbies: string
    forView?: boolean
    editInfo: EditInfoFunc
}

const InformationComponent: React.FC<IProps> = ({ aboutMe, hobbies, skills, forView = false, editInfo, userId }) => {
    const dispatch = useDispatch()
    const [editStatus, setEditStatus] = useState(false)

    const { mutateAsync:setAboutMe } = useMutation('set about me', (data: TextProps) => ProfileService.setAboutMe(data.text, data.userId),
        {
            onSuccess(response) {
                dispatch(profileActions.setAboutMe(response.data))
            }
        }
    )

    const { mutateAsync:setHobbies } = useMutation('set hobbies', (data: TextProps) => ProfileService.setHobbies(data.text, data.userId),
        {
            onSuccess(response) {
                dispatch(profileActions.setHobbies(response.data))
            }
        }
    )

    const { mutateAsync:setSkills } = useMutation('set skills', (data: TextProps) => ProfileService.setSkills(data.text, data.userId),
        {
            onSuccess(response) {
                dispatch(profileActions.setSkills(response.data))
            }
        }
    )

    return(
        <div className={`${styles['information']} rounded-lg`}>
            <h3 className={'text-lg font-medium'}>Profile Intro</h3>
            <hr className={'w-full h-0.5'}/>
            <InformationItem userId={userId} editInfo={editInfo} forView={forView} title={'About Me'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'aboutMe'} text={aboutMe} setText={setAboutMe}/>
            <InformationItem userId={userId} editInfo={editInfo} forView={forView} title={'Skills'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'hobbies'} text={hobbies} setText={setHobbies}/>
            <InformationItem userId={userId} editInfo={editInfo} forView={forView} title={'Hobbies'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'skills'} text={skills} setText={setSkills}/>
        </div>
    )
}

export const Information = React.memo(InformationComponent)
