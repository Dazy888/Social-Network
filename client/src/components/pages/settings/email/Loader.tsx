import React from "react"
import styles from "@/styles/Settings.module.scss"

const LoaderComponent = () => <div className={`${styles.loader} relative mx-auto mt-6`}></div>
export const Loader = React.memo(LoaderComponent)
