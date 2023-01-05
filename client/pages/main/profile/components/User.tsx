import styles from '../../../../styles/Profile.module.scss'
import {useMutation, useQuery} from "react-query";
import {ProfileService} from "../../../../services/profile-service";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {getId} from "../../../../store/reducers/profile/profile-selectors";
import {AvatarProps} from "../types/profile-types";

type PropsType = {
    id: string
}
export function User({ id }: PropsType) {
    const router = useRouter()
    const initialUserId = useSelector(getId)
    const [avatar, setAvatar] = useState<string>('')

    // console.log(id)

    const { mutateAsync} = useMutation('get avatar', (data: AvatarProps) => ProfileService.getAvatar(data.id), {onSuccess: (res) => setAvatar(res.data)})

    useEffect(() => {
        mutateAsync({id})
    }, [id])

    function goToProfile(id: string) {
        (id === initialUserId) ? router.push('/main/profile') : router.push(`/main/profile/${id}`)
    }

    return(
        <div onClick={() => goToProfile(id)} className={styles['user']}>
            <img alt={'Avatar'} src={avatar}/>
        </div>
    )
}