import React from "react"
import { useRouter } from "next/router"
// @ts-ignore
import styles from '../styles/Not-Found.module.scss'
const NoContent = () => {
    const router = useRouter()

    return(
        <div className={`${styles['content']} flex-center`}>
            <div>
                <div className={`${styles['content-container']} flex-between`}>
                    <h1>404</h1>
                    <hr/>
                    <p>Something went wrong, go back to the main page</p>
                </div>
                <button onClick={() => router.push('/main/profile')}>Go Home</button>
            </div>
        </div>
    )
}
export default React.memo(NoContent)