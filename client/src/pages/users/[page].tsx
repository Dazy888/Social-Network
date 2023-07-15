import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useAppSelector } from "@/hooks/redux"
import { UsersService } from "@/services/users.service"
import { notify } from "@/components/pages/auth/form/AuthForm"
import { IUserPreview } from "@/models/users.models"
// Components
import { MainLayout } from "@/layouts/MainLayout"
import { UsersList } from "@/components/pages/users/Users"
import { Loader } from "@/components/common/Loader"

const Users = () => {
    const [users, setUsers] = useState<IUserPreview[]>([])
    const [length, setLength] = useState(0)
    const [skip, setSkip] = useState(0)

    const id = useAppSelector(state => state.profileReducer.id)

    const { refetch, isLoading } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res) {
            setLength(res.length)
            setUsers(res.profiles)
        },
        onError: (err: string) => notify(err, 'error'),
        enabled: false
    })

    useEffect(() => {
        if (id) refetch()
    }, [id])

    return (
        <MainLayout title={'Users'}>
            {isLoading ? <Loader /> : <UsersList {...{ isLoading, users, length, setSkip, refetch }} />}
        </MainLayout>
    )
}

export default React.memo(Users)
