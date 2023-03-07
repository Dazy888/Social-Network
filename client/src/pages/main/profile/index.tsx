import React from "react"
import Head from "next/head"
import { useSelector } from "react-redux"
// Components
import { Post } from "@/components/profile/Post"
import { Header } from "@/components/profile/Header"
import { Main } from "@/components/profile/Main"
// Layout
import { MainPage } from "@/layouts/MainPage-Layout"
// Interfaces
import { ChangeInfoFunc, EditInfoFunc, PostI } from "@/interfaces/profile-interfaces"
// Store
import { getAvatar, getBanner, getId, getLocation, getName } from "@/store/reducers/profile/profile-selectors"
// Styles
import styles from '@/styles/Profile.module.scss'

export const getPostsElements = (posts: PostI[], id: string, avatar: string, name: string, forView: boolean) => {
    return [...posts].reverse().map((p, pos) => {
        const date = Math.abs(new Date().getTime() - new Date(p.date).getTime())
        let time: string | undefined

        if (Math.round(date / 1000 / 60) === 1) {
            time = `1 minute ago`
        } else if (Math.round(date / 1000 / 60) < 60) {
            time = `${Math.round(date / 1000 / 60)} minutes ago`
        } else if (Math.round(date / 1000 / 60 / 60) === 1) {
            time = `1 hour ago`
        } else if (Math.round(date / 1000 / 60 / 60) < 24) {
            time = `${Math.round(date / 1000 / 60 / 60)} hours ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24) === 1) {
            time = `1 day ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24) < 31) {
            time = `${Math.round(date / 1000 / 60 / 60 / 24)} days ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24 / 12) === 1) {
            time = `${Math.round(date / 1000 / 60 / 60 / 24 / 12)} month ago`
        } else if (Math.round(date / 1000 / 60 / 60 / 24 / 12) < 12) {
            time = `${Math.round(date / 1000 / 60 / 60 / 24 / 12)} months ago`
        }

        return <Post forView={forView} key={pos} userId={id} id={p.postId} avatar={avatar} name={name} date={time} text={p.text}/>
    })
}
export const editInfo: EditInfoFunc = (event: any, changeText: ChangeInfoFunc, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textareaRef: any, id: string) => {
    function setStatuses(status: boolean) {
        setEditStatus(status)
        setStatus(status)
    }

    setStatuses(true)

    setTimeout(() => {
        const textarea = textareaRef.current
        textarea.value = value
        textarea.onblur = async () => {
            await changeText({text: textarea.value, id})
            text.innerText = textarea.value
            document.onkeydown = null
            setStatuses(false)
        }
    }, 1)
}

const Index = () => {
    const id = useSelector(getId)
    const avatar = useSelector(getAvatar)
    const banner = useSelector(getBanner)
    const location = useSelector(getLocation)
    const name = useSelector(getName)

    return(
        <MainPage>
            <Head>
                <title>Profile</title>
            </Head>
            {id &&
                <div id={styles['profile']} className={'my-24 mx-auto'}>
                    <Header location={location} avatar={avatar} name={name} banner={banner}/>
                    <Main id={id}/>
                </div>
            }
        </MainPage>
    )
}

export default React.memo(Index)