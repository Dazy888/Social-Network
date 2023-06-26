import React, { useState } from "react"
import { useRouter } from "next/router"
import styles from '@/styles/Profile.module.scss'
import { useQuery } from "react-query"
import { ProfileService } from "@/services/profile.service"
import { useAppSelector } from "@/hooks/redux"
import { notify } from "@/components/pages/auth/AuthForm"

interface Props  {
    id: string
}

const UserAvatarComponent: React.FC<Props> = ({ id }) => {
    const router = useRouter()
    const initialUserId = useAppSelector(state => state.profileReducer.id)
    const [avatar, setAvatar] = useState('')

    const {} = useQuery('get avatar', () => ProfileService.getAvatar(id), {
        onSuccess: (res) => setAvatar(res),
        onError: (err: string) => notify(err, 'error')
    })

    const goToProfile = (id: string) => (id === initialUserId) ? router.push('/profile') : router.push(`/profile/${id}`)

    return(
        <div onClick={() => goToProfile(id)} className={styles['subscriptions__user']}>
            <img className={'w-10 h-10 rounded-full cursor-pointer'} alt={'Avatar'} src={avatar}/>
        </div>
    )
}

export const UserAvatar = React.memo(UserAvatarComponent)
