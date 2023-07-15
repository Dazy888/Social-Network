import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { v4 } from "uuid"
import styles from "@/styles/Users.module.scss"
import ReactPaginate from "react-paginate"
import { IUserPreview } from "@/models/users.models"
// Alert
import { notify } from "@/components/pages/auth/form/AuthForm"
// Components
import { UserPreview } from "@/components/pages/users/User"

interface Props {
    setSkip: (skip: number) => void
    refetch: () => void
    users: IUserPreview[]
    length: number
    isLoading: boolean
}

const UsersListComponent: React.FC<Props> = ({ setSkip, refetch, users, length, isLoading }) => {
    const router = useRouter()

    const [usersOnPage, setUsersOnPage] = useState(20)
    const [gridCols, setGridCols] = useState(1)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const pageCount = Math.ceil(length / usersOnPage)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handlePageClick = async (e: any) => {
        if (isLoading) return notify('Page is loading, wait a second', 'warning')

        let skip = 0

        if (windowWidth <= 350) {
            skip = 5
            setUsersOnPage(5)
        } else if (windowWidth <= 550) {
            skip = 10
            setUsersOnPage(10)
        } else if (windowWidth <= 768) {
            skip = 12
            setUsersOnPage(12)
        } else if (windowWidth <= 1024) {
            skip = 16
            setUsersOnPage(16)
        }

        await setSkip(e.selected * skip)
        await router.push(`/users/${e.selected + 1}`)
        refetch()
    }

    const usersElem = users.map((user) => <UserPreview location={user.location} avatar={user.avatar} name={user.name} id={user.userId} key={v4()} />)
    const usersLength = usersElem.length

    useEffect(() => {
        const updateGridCols = () => {
            if ((windowWidth <= 350) || (usersLength === 1)) return setGridCols(1)
            if ((windowWidth <= 550) || (usersLength === 2)) return setGridCols(2)
            if ((windowWidth <= 768 && usersLength >= 5) || (usersLength === 3)) return setGridCols(3)
            if ((windowWidth <= 1024 && usersLength >= 5) || (usersLength === 4)) return setGridCols(4)
            if (usersLength >= 5) setGridCols(5)
        }

        updateGridCols()
    }, [windowWidth, usersLength])

    return(
        <div className={'pt-20'}>
            {(usersLength > 0) &&
                <>
                    <ReactPaginate breakLabel={'...'} nextLabel={'>'} onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel={'<'} renderOnZeroPageCount={undefined}
                                   containerClassName={`${styles.pagination} flex-center gap-1`} pageLinkClassName={`${styles['pagination__num']} flex-center`} previousLinkClassName={`flex-center ${styles['pagination__btn']} ${styles.left} mr-3`}
                                   activeClassName={styles.active} nextLinkClassName={`flex-center ${styles['pagination__btn']} ${styles.right} ml-3`} initialPage={Number(router.query.page) - 1}
                    />
                    <div className={'w-fit mt-20 mx-auto'}>
                        <div className={`grid grid-cols-${gridCols} gap-10`}>{usersElem}</div>
                    </div>
                </>
            }
        </div>
    )
}

export const UsersList = React.memo(UsersListComponent)
