import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// Layout
import { MainPageLayout } from "../../../layouts/MainPage-Layout"
// Paginator
import ReactPaginate from "react-paginate"
// Styles
// @ts-ignore
import styles from '../../../styles/Users.module.scss'
// React Query
import { useQuery } from "react-query"
// HTTP Service
import { UsersService } from "../../../services/users-service"
// Components
import { UserPreview } from "./components/User"
import { Loader } from "./components/Loader"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
// Typification
import { UserPreviewData, UsersResponse } from "../../../models/users-responses"
import { AxiosResponse } from "axios"
// Typification
const Users = () => {
    const [users, setUsers] = useState<UserPreviewData[]>([])
    const [length, setLength] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)

    const id = useSelector(getId)
    const router = useRouter()

    const { refetch } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res: AxiosResponse<UsersResponse>) {
            setLength(res.data.length)
            setUsers(res.data.users)
        },
        enabled: false
    })

    useEffect(() => {
        setTimeout(async () => {
            await refetch()
        }, 300)
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
        <MainPageLayout>
            <Head>
                <title>Users</title>
            </Head>
            <div>
                {id
                    ?   <div>
                            <ReactPaginate
                                breakLabel={"..."}
                                nextLabel={">"}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel={"<"}
                                renderOnZeroPageCount={undefined}
                                containerClassName={'pagination flex-center'}
                                pageLinkClassName={'page-num flex-center'}
                                previousLinkClassName={'page-num flex-center paginator-btn left'}
                                nextLinkClassName={'page-num flex-center paginator-btn right'}
                                activeClassName={'active'}
                                initialPage={Number(router.query.page) - 1}
                            />
                            <div className={`${styles['content']} users`}>
                                {usersElem}
                            </div>
                         </div>
                    :   <Loader/>}
            </div>
        </MainPageLayout>
    )
}
export default React.memo(Users)