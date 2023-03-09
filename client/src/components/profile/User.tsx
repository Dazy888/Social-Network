import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
// Styles
import styles from '@/styles/Profile.module.scss'
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { ProfileService } from "@/services/profile.service"
// Store
import { getId } from "@/store/reducers/profile/profile.selectors"
// Interfaces
import { AvatarProps } from "@/interfaces/profile.interfaces"

interface IProps  {
    userId: string
}

const UserComponent: React.FC<IProps> = ({ userId }) => {
    const router = useRouter()
    const initialUserId = useSelector(getId)
    const [avatar, setAvatar] = useState('')

    const { mutateAsync} = useMutation('get avatar', (data: AvatarProps) => ProfileService.getAvatar(data.userId), {onSuccess: (res) => setAvatar(res.data)})

    useEffect(() => {
        mutateAsync({userId})
    }, [userId, mutateAsync])

    const goToProfile = (userId: string) => (userId === initialUserId) ? router.push('/main/profile') : router.push(`/main/profile/${userId}`)

    return(
        <div onClick={() => goToProfile(userId)} className={styles['subscriptions__user']}>
            <img className={'w-10 h-10 rounded-full cursor-pointer'} alt={'Avatar'} src={avatar}/>
        </div>
    )
}

export const User = React.memo(UserComponent)
