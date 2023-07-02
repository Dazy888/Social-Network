import React from "react"
import styles from "@/styles/Profile.module.scss"

const TileComponent = () => <div className={styles.tile}></div>
export const Tile = React.memo(TileComponent)
