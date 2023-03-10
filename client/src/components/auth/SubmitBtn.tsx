import React from "react"
import styles from "@/styles/Authorization.module.scss"

interface IProps {
    isLoading: boolean
    value: string
}

const SubmitBtnComponent: React.FC<IProps> = ({ isLoading, value }) => <button className={`${styles['auth__submit']} font-semibold text-white`} type={'submit'} disabled={isLoading}>Sign {value}</button>
export const SubmitBtn = React.memo(SubmitBtnComponent)
