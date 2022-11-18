import React, {useEffect, useMemo} from "react"
import {useMutation, useQuery} from "react-query"
import {UsersService} from "../../services/users-service"

export function Users() {
    // Post mutation
    // const {isLoading, mutateAsync} = useMutation('users', (data: any) => UsersService.getUsers())

    // Get onClick
    // const {isLoading, data:response, error, refetch} = useQuery('users', () => UsersService.getUsers(), {enabled: false})


    // const {isLoading, data:response, error} = useQuery('users', () => UsersService.getUsers())
    // console.log(response)

    // const users = useMemo(() => [...posts].reverse().map((p) => <Post userId={id} id={p.id} deletePost={deletePost} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    return(
        <div className={'users'}>

        </div>
    )
}