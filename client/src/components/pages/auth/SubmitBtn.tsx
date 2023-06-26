import React from "react"
import styles from "@/styles/Authorization.module.scss"
import ScaleLoader from "react-spinners/ScaleLoader"

interface Props {
    isLoading: boolean
    value: string
}

const SubmitBtnComponent: React.FC<Props> = ({ isLoading, value }) => (
    <button className={`${styles['auth__submit']} font-semibold text-white`} type={'submit'} disabled={isLoading}>
        {isLoading ? <ScaleLoader color={'rgb(255, 255, 255)'} loading={isLoading}/> : `Sign ${value}`}
    </button>
)
export const SubmitBtn = React.memo(SubmitBtnComponent)
