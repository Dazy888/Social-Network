import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useAppSelector } from "@/hooks/redux"
import { UsersService } from "@/services/users.service"
import { notify } from "@/components/auth/AuthForm"
import { IUserPreview } from "@/models/users.models"
// Components
import { Loader } from "@/components/users/Loader"
import { MainPage } from "@/layouts/MainPageLayout"
import { Content } from "@/components/users/Content"

const Users = () => {
    const id = useAppSelector(state => state.profileReducer.id)

    const [users, setUsers] = useState<IUserPreview[]>([])
    const [length, setLength] = useState(0)
    const [skip, setSkip] = useState(0)

    const { refetch, isLoading } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res) {
            setLength(res.length)
            setUsers(res.usersData)
        },
        onError: (err: string) => notify(err, 'error')
    })

    useEffect(() => {
        setTimeout(() => refetch(), 300)
    }, [refetch])

    return (
        <MainPage title={'Users'}>
            { isLoading ? <Loader/> : <Content isLoading={isLoading} length={length} setSkip={setSkip} refetch={refetch} users={users} /> }
        </MainPage>
    )
}

export default React.memo(Users)
