import React from "react"
import styles from "@/styles/Profile.module.scss"
import { ProfileIntroItem } from "@/components/pages/profile/main-section/profile-intro/ProfileIntroItem"

interface Props {
    aboutMe: string
    skills: string
    hobbies: string
    id?: string
    forView?: boolean
}

const ProfileIntroComponent: React.FC<Props> = ({ aboutMe, hobbies, skills, forView = false, id }) => (
    <article className={`${styles['profile-intro']} rounded-lg`}>
        <h3 className={'text-lg font-medium'}>Profile intro</h3>
        <hr className={'w-full h-0.5'}/>
        <ProfileIntroItem {...{ id, forView }} title={'About me'} field={'aboutMe'} currentText={aboutMe} />
        <ProfileIntroItem {...{ id, forView }} title={'Hobbies'} field={'skills'} currentText={skills} />
        <ProfileIntroItem {...{ id, forView }} title={'Skills'} field={'hobbies'} currentText={hobbies} />
    </article>
)

export const ProfileIntro = React.memo(ProfileIntroComponent)
