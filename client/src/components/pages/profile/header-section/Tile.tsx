import React, { ReactNode } from "react"
import styles from "@/styles/Profile.module.scss"

interface Props {
    subscriptionBtn: ReactNode
}

const TileComponent: React.FC<Props> = ({ subscriptionBtn }) => <div className={`${styles.tile} relative`}>{subscriptionBtn}</div>
export const Tile = React.memo(TileComponent)
