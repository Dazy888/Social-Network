import React from "react"
import styles from "@/styles/Settings.module.scss"

interface Props {
    loadingClassName: string
    disabled: boolean
}

const SubmitBtnComponent: React.FC<Props> = ({ loadingClassName, disabled }) => {
    return <button className={`${styles.submit} ${loadingClassName} w-full tracking-wider font-medium text-white py-4`} type={'submit'} disabled={disabled}>Activate</button>
}

export const SubmitBtn = React.memo(SubmitBtnComponent)
