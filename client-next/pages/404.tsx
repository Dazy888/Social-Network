import { useRouter } from "next/router"
import styles from '../styles/Error.module.scss'

export default function NoContent() {
    const router = useRouter()

    return(
        <div className={styles['content']}>
            <div className={`${styles['content-container']} flex-between`}>
                <h1>404</h1>
                <hr/>
                <p>Something went wrong, go back to the main page</p>
            </div>
            <button onClick={() => router.push('/main/profile')}>Go Home</button>
        </div>
    )
}