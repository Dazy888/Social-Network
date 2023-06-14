import React from "react"
import { useRouter } from "next/router"
import styles from '@/styles/Not-Found.module.scss'

const NoContent = () => {
    const router = useRouter()

    return(
        <div className={`${styles.content} flex justify-center items-center h-screen text-white font-medium`}>
            <div>
                <div className={`${styles.text} flex justify-between items-center`}>
                    <h1 className={'text-5xl'}>404</h1>
                    <hr className={'w-0.5 h-12'}/>
                    <p className={'text-2xl max-w-sm'}>Something went wrong, go back to the main page</p>
                </div>
                <button className={'w-48 h-12 text-xl mt-12 mx-auto block duration-300 rounded-lg'} onClick={() => router.push('/profile')}>Go Home</button>
            </div>
        </div>
    )
}

export default React.memo(NoContent)
