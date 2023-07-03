import React from "react"
import styles from "@/styles/Auth.module.scss"
import ScaleLoader from "react-spinners/ScaleLoader"

interface Props {
    isLoading: boolean
    value: string
}

const SubmitBtnComponent: React.FC<Props> = ({ isLoading, value }) => (
    <button className={'ml-auto flex-center py-4 px-10 rounded-full font-medium text-white duration-300'} type={'submit'} disabled={isLoading}>
        {false ? <ScaleLoader className={styles.loader} color={'rgb(255, 255, 255)'} /> : `Sign ${value}`}
    </button>
)
export const SubmitBtn = React.memo(SubmitBtnComponent)
