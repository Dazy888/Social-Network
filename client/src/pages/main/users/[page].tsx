import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { useAppSelector } from "@/hooks/redux"
import { UsersService } from "@/services/users.service"
import { IUserPreview } from "@/models/users"
import { v4 } from "uuid"
// Paginator
import ReactPaginate from "react-paginate"
// Styles
import styles from '@/styles/Users.module.scss'
// Components
import { UserPreview } from "@/components/users/User"
import { Loader } from "@/components/users/Loader"
import { MainPage } from "@/layouts/MainPage-Layout"

const Users = () => {
    const id = useAppSelector(state => state.profileReducer.id)
    const router = useRouter()

    const [users, setUsers] = useState<IUserPreview[]>([])
    const [length, setLength] = useState(0)
    const [skip, setSkip] = useState(0)


    const { refetch, isLoading } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res) {
            setLength(res.length)
            setUsers(res.usersData)
        }
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

    const usersElem = users.map((user) => {
        if (user.id !== id) return <UserPreview location={user.location} avatar={user.avatar} name={user.name} userId={user.id} key={v4()}/>
    })

    return (
        <MainPage title={'Users'}>
            <div>
                {isLoading
                    ?   <Loader/>
                    :   <div>
                            <ReactPaginate breakLabel={"..."} nextLabel={">"} onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel={"<"}
                                           renderOnZeroPageCount={undefined} containerClassName={'pagination flex justify-center items-center'}
                                           pageLinkClassName={'page-num flex justify-center items-center'}
                                           previousLinkClassName={'page-num flex justify-center items-center paginator-btn left'}
                                           nextLinkClassName={'page-num flex justify-center items-center paginator-btn right'} activeClassName={'active'}
                                           initialPage={Number(router.query.page) - 1}
                            />
                            <div className={`${styles.content} w-96 flex justify-between flex-wrap my-44 mx-auto`}>
                                {usersElem}
                            </div>
                        </div>
                }
            </div>
        </MainPage>
    )
}

export default React.memo(Users)
