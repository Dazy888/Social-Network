import Head from "next/head"
import { useState } from "react"
import { MainLayout } from "../../../layouts/Main-Layout"
import ReactPaginate from "react-paginate"

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export default function Users() {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 4; // items per page
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / 4);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 4) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <MainLayout>
            <Head>
                <title>Users</title>
            </Head>
            <div>
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
                />
                <div>
                    
                </div>
            </div>
        </MainLayout>
    )
}