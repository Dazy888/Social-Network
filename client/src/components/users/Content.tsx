import React from "react"
import styles from "@/styles/Users.module.scss"
import { v4 } from "uuid"
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"
import { UserPreview } from "@/components/users/User"
import { useAppSelector } from "@/hooks/redux"
import { IUserPreview } from "@/models/users.models"
import { notify } from "@/components/auth/AuthForm"

interface Props {
    setSkip: (skip: number) => void
    refetch: () => void
    users: IUserPreview[]
    length: number
    isLoading: boolean
}

const ContentComponent: React.FC<Props> = ({ setSkip, refetch, users, length, isLoading }) => {
    const router = useRouter()
    const id = useAppSelector(state => state.profileReducer.id)

    const pageCount = Math.ceil(length / 4)

    const handlePageClick = async (event: any) => {
        if (isLoading) return notify('Page is loading, wait a second', 'warning')
        await setSkip(event.selected * 4)
        await router.push(`/main/users/${event.selected + 1}`)
        refetch()
    }

    const usersElem = users.map((user) => {
        if (user.id !== id) return <UserPreview location={user.location} avatar={user.avatar} name={user.name} userId={user.id} key={v4()}/>
    })

    return(
        <div>
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
    )
}

export const Content = React.memo(ContentComponent)
