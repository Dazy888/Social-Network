import { useMemo, useState } from "react"
// Styles
import styles from "../../../../styles/Profile.module.scss"
// Components
import {User} from "./User"
// React Query
import { useQuery } from "react-query"
// Service
import { ProfileService } from "../../../../services/profile-service"
// Types
import { SubscriptionsResponse } from "../../../../models/profile-responses"
import { AxiosResponse } from "axios"
import {UsersService} from "../../../../services/users-service";
import {getLocFor} from "@typescript-eslint/typescript-estree/dist/node-utils";

type PropsType = {
    followers: string[]
    following: string[]
}

export function Subscriptions({ followers, following }: PropsType) {
     return(
        <div className={styles['subscriptions']}>
            <div className={styles['followers']}>
                <h3 className={styles['title']}>Followers {followers.length}</h3>
                <hr/>
                <div className={styles['content']}>
                    {followers}
                </div>
            </div>
            <div className={styles['following']}>
                <h3 className={styles['title']}>Following {following.length}</h3>
                <hr/>
                <div className={styles['content']}>
                    {following}
                </div>
            </div>
        </div>
    )
}