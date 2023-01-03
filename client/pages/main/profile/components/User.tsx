import styles from '../../../../styles/Profile.module.scss'

type PropsType = {
    avatar: string
}
export default function User({ avatar }: PropsType) {
    return(
        <div className={styles['user']}>
            <img alt={'Avatar'} src={avatar}/>
        </div>
    )
}