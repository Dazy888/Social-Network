import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// Layout
import { MainLayout } from "../../../layouts/Main-Layout"
// Paginator
import ReactPaginate from "react-paginate"
// Styles
import styles from '../../../styles/Users.module.scss'
// React Query
import { useQuery } from "react-query"
// HTTP Service
import { UsersService } from "../../../services/users-service"
// Components
import { User } from "./components/User"
import { Loader } from "./components/Loader"
// Store
import { getId } from "../../../store/reducers/profile/profile-selectors"
// Typification
import { UsersPreviewData } from '../../../models/users-responses'
export default function Users() {
    const [users, setUsers] = useState<UsersPreviewData[]>([])
    const [length, setLength] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)

    const id = useSelector(getId)
    const router = useRouter()

    const { refetch } = useQuery('get users', () => UsersService.getUsers(skip, id), {
        onSuccess(res) {
            setLength(res.data.length)
            setUsers(res.data.users)
        },
        enabled: false
    })

    useEffect(() => {
        setTimeout(() => {
            refetch()
        }, 300)
    }, [])

    const pageCount = Math.ceil(length / 4)
    const handlePageClick = async (event: any) => {
        await setSkip(event.selected * 4)
        await router.push(`/main/users/${event.selected + 1}`)
        await refetch()
    }

    const usersElem = users.map((user, pos) => {
        if (user.userId !== id) {
            return <User location={user.location} avatar={user.avatar} name={user.name} id={user.userId} key={pos}/>
        }
    })

    return (
        <MainLayout>
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
        </MainLayout>
    )
}