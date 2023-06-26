import React from "react"
import { useRouter } from "next/router"
import { v4 } from "uuid"
import styles from "@/styles/Users.module.scss"
import ReactPaginate from "react-paginate"
import { IUserPreview } from "@/models/users.models"
import { notify } from "@/components/pages/auth/AuthForm"
import { UserPreview } from "@/components/users/UserAvatar"

interface Props {
    setSkip: (skip: number) => void
    refetch: () => void
    users: IUserPreview[]
    length: number
    isLoading: boolean
}

const UsersListComponent: React.FC<Props> = ({ setSkip, refetch, users, length, isLoading }) => {
    const router = useRouter()
    const pageCount = Math.ceil(length / 4)

    const handlePageClick = async (e: any) => {
        if (isLoading) return notify('Page is loading, wait a second', 'warning')
        await setSkip(e.selected * 4)
        await router.push(`/users/${e.selected + 1}`)
        refetch()
    }

    const usersElem = users.map((user) => <UserPreview location={user.location} avatar={user.avatar} name={user.name} id={user.id} key={v4()}/>)

    return(
        <div>
            {usersElem.length > 0 &&
                <>
                    <ReactPaginate breakLabel={'...'} nextLabel={'>'} onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel={'<'} renderOnZeroPageCount={undefined}
                                   containerClassName={'pagination flex justify-center items-center'} pageLinkClassName={'page-num flex justify-center items-center'}
                                   previousLinkClassName={'page-num flex justify-center items-center paginator-btn left'} activeClassName={'active'}
                                   nextLinkClassName={'page-num flex justify-center items-center paginator-btn right'} initialPage={Number(router.query.page) - 1}
                    />
                    <div className={`${styles.content} w-96 flex justify-between flex-wrap my-44 mx-auto`}>
                        {(usersElem.length > 0) && <div className={'grid grid-cols-2 gap-10'}>{usersElem}</div>}
                    </div>
                </>
            }
        </div>
    )
}

export const UsersList = React.memo(UsersListComponent)
