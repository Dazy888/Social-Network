import React, { useState } from "react"
import styles from "@/styles/Profile.module.scss"
import { InformationItem } from "@/components/profile/main/infornation/InformationItem"
import { useMutation } from "react-query"
import { TextProps } from "@/models/profile.models"
import { useAppDispatch } from "@/hooks/redux"
// Alert
import { notify } from "@/components/auth/AuthForm"
// Service
import { ProfileService } from "@/services/profile.service"
// Store
import { setProfileIntro } from "@/store/reducers/ProfileSlice"

interface Props {
    aboutMe: string
    skills: string
    hobbies: string
    id?: string
    forView?: boolean
}

const InformationComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, id }) => {
    const dispatch = useAppDispatch()

    const { mutateAsync:setAboutMe } = useMutation('set about me', (data: TextProps) => ProfileService.setProfileIntro(data.text, 'aboutMe', data.id),
        {
            onSuccess: (res): any => dispatch(setProfileIntro({ text: res, field: 'aboutMe' })),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { mutateAsync:setSkills } = useMutation('set skills', (data: TextProps) => ProfileService.setProfileIntro(data.text, 'skills', data.id),
        {
            onSuccess: (res): any => dispatch(setProfileIntro({ text: res, field: 'skills' })),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    const { mutateAsync:setHobbies } = useMutation('set hobbies', (data: TextProps) => ProfileService.setProfileIntro(data.text, 'hobbies', data.id),
        {
            onSuccess: (res): any => dispatch(setProfileIntro({ text: res, field: 'hobbies' })),
            onError: (err: string): any => notify(err, 'error')
        }
    )

    return(
        <div className={`${styles.information} rounded-lg`}>
            <h3 className={'text-lg font-medium'}>Profile intro</h3>
            <hr className={'w-full h-0.5'}/>
            <InformationItem {...{ id, forView }} title={'About me'} field={'aboutMe'} currentText={aboutMe} asyncRequest={setAboutMe} />
            <InformationItem {...{ id, forView }} title={'Hobbies'} field={'skills'} currentText={skills} asyncRequest={setSkills} />
            <InformationItem {...{ id, forView }} title={'Skills'} field={'hobbies'} currentText={hobbies} asyncRequest={setHobbies} />
        </div>
    )
}

export const Information = React.memo(InformationComponent)
