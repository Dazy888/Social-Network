import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
// Layouts
import { MainPage } from "@/layouts/MainPage-Layout"
// Paginator
import ReactPaginate from "react-paginate"
// Styles
import styles from '@/styles/Users.module.scss'
// React Query
import { useQuery } from "react-query"
// HTTP Service
import { UsersService } from "@/services/users-service"
// Components
import { UserPreview } from "@/components/users/User"
import { Loader } from "@/components/users/Loader"
// Store
import { getId } from "@/store/reducers/profile/profile-selectors"
// Interfaces
import { UserPreviewDataI, UsersResponseI } from "@/models/users-responses"
import { AxiosResponse } from "axios"

const Users = () => {
    const [users, setUsers] = useState<UserPreviewDataI[]>([])
    const [length, setLength] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)

    const id = useSelector(getId)
    const router = useRouter()

    const { refetch } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res: AxiosResponse<UsersResponseI>) {
            setLength(res.data.length)
            setUsers(res.data.users)
        },
        enabled: false
    })

    useEffect(() => {
        setTimeout(async () => refetch(), 300)
    }, [refetch])

    const pageCount = Math.ceil(length / 4)

    const handlePageClick = async (event: any) => {
        await setSkip(event.selected * 4)
        await router.push(`/main/users/${event.selected + 1}`)
        await refetch()
    }

    const usersElem = users.map((user, pos) => {
        if (user.userId !== id) {
            return <UserPreview location={user.location} avatar={user.avatar} name={user.name} id={user.userId} key={pos}/>
        }
    })

    return (
        <MainPage>
            <Head>
                <title>Users</title>
            </Head>
            <div>
                {id
                    ?   <div>
                            <ReactPaginate breakLabel={"..."} nextLabel={">"} onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel={"<"}
                                renderOnZeroPageCount={undefined} containerClassName={'pagination flex justify-center items-center'}
                                pageLinkClassName={'page-num flex justify-center items-center'}
                                previousLinkClassName={'page-num flex justify-center items-center paginator-btn left'}
                                nextLinkClassName={'page-num flex justify-center items-center paginator-btn right'} activeClassName={'active'}
                                initialPage={Number(router.query.page) - 1}
                            />
                            <div className={`${styles['content']} w-96 flex justify-between flex-wrap my-44 mx-auto`}>
                                {usersElem}
                            </div>
                         </div>
                    :   <Loader/>}
            </div>
        </MainPage>
    )
}

export default React.memo(Users)