import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { InformationItem } from "@/components/profile/InformationItem"
import { setAboutMeText, setHobbiesText, setSkillsText } from "@/store/reducers/ProfileSlice"
import { useMutation } from "react-query"
import { TextProps } from "@/models/profile"
import { ProfileService } from "@/services/profile.service"
import { useAppDispatch } from "@/hooks/redux"
import { notify } from "@/pages/auth/sign-in"

interface Props {
    aboutMe: string
    skills: string
    hobbies: string
    id?: string
    forView?: boolean
}

const InformationComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, id }) => {
    const dispatch = useAppDispatch()
    const [editStatus, setEditStatus] = useState(false)

    const { mutateAsync:setAboutMe } = useMutation('set about me', (data: TextProps) => ProfileService.setAboutMe(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(setAboutMeText(res.data)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { mutateAsync:setHobbies } = useMutation('set hobbies', (data: TextProps) => ProfileService.setHobbies(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(setHobbiesText(res.data)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { mutateAsync:setSkills } = useMutation('set skills', (data: TextProps) => ProfileService.setSkills(data.text, data.id),
        {
            onSuccess: (res): any => dispatch(setSkillsText(res.data)),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div className={`${styles.information} rounded-lg`}>
            <h3 className={'text-lg font-medium'}>Profile Intro</h3>
            <hr className={'w-full h-0.5'}/>
            <InformationItem id={id} forView={forView} title={'About Me'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'aboutMe'} text={aboutMe} setText={setAboutMe}/>
            <InformationItem id={id} forView={forView} title={'Skills'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'hobbies'} text={hobbies} setText={setHobbies}/>
            <InformationItem id={id} forView={forView} title={'Hobbies'} editStatus={editStatus} setEditStatus={setEditStatus} textId={'skills'} text={skills} setText={setSkills}/>
        </div>
    )
}

export const Information = React.memo(InformationComponent)
