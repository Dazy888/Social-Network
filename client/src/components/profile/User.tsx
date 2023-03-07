import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
// Styles
import styles from '@/styles/Profile.module.scss'
// React Query
import { useMutation } from "react-query"
// HTTP Service
import { ProfileService } from "@/services/profile-service"
// Store
import { getId } from "@/store/reducers/profile/profile-selectors"
// Interfaces
import { AvatarPropsI } from "@/interfaces/profile-interfaces"

interface Props  {
    id: string
}

const UserComponent: React.FC<Props> = ({ id }) => {
    const router = useRouter()
    const initialUserId = useSelector(getId)
    const [avatar, setAvatar] = useState('')

    const { mutateAsync} = useMutation('get avatar', (data: AvatarPropsI) => ProfileService.getAvatar(data.id), {onSuccess: (res) => setAvatar(res.data)})

    useEffect(() => {
        mutateAsync({id})
    }, [id, mutateAsync])

    function goToProfile(id: string) {
        (id === initialUserId) ? router.push('/main/profile') : router.push(`/main/profile/${id}`)
    }

    return(
        <div onClick={() => goToProfile(id)} className={styles['subscriptions__user']}>
            <img className={'w-10 h-10 rounded-full cursor-pointer'} alt={'Avatar'} src={avatar}/>
        </div>
    )
}
export const User = React.memo(UserComponent)