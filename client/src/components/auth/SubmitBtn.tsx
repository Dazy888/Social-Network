import React from "react"
import styles from "@/styles/Authorization.module.scss"

interface Props {
    isLoading: boolean
    value: string
}

const SubmitBtnComponent: React.FC<Props> = ({ isLoading, value }) => <button className={`${styles['auth__submit']} font-semibold text-white`} type={'submit'} disabled={isLoading}>Sign {value}</button>
export const SubmitBtn = React.memo(SubmitBtnComponent)
