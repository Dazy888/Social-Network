import React from "react"
import styles from "@/styles/Profile.module.scss"
import { ProfileIntroItem } from "@/components/pages/profile/main-section/profile-intro/ProfileIntroItem"

interface Props {
    aboutMe: string | null
    skills: string | null
    hobbies: string | null
    id?: string
    forView?: boolean
}

const ProfileIntroComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, id }) => (
    <article className={styles['profile-intro']}>
        <h3 className={'text-lg font-medium'}>Profile intro</h3>
        <hr className={'w-full h-0.5'}/>
        <ProfileIntroItem {...{ id, forView }} title={'About me'} field={'aboutUserText'} currentText={aboutMe} placeholder={'Tell about yourself here.'} />
        <ProfileIntroItem {...{ id, forView }} title={'Hobbies'} field={'userHobbiesText'} currentText={hobbies} placeholder={'Tell people about your hobbies here.'} />
        <ProfileIntroItem {...{ id, forView }} title={'Skills'} field={'userSkillsText'} currentText={skills} placeholder={'Write your skills here.'} />
    </article>
)

export const ProfileIntro = React.memo(ProfileIntroComponent)
