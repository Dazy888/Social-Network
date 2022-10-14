import React, {useMemo} from "react"
import {useMutation, useQuery} from "react-query"
import {UsersService} from "../../services/UsersService"

export function Users() {
    function ello(): any {

    }
    const {isLoading, data:response, error} = useQuery('users', () => UsersService.getUsers())

    console.log(response)

    // const users = useMemo(() => [...posts].reverse().map((p) => <Post userId={id} id={p.id} deletePost={deletePost} avatar={avatar} name={name} date={Math.abs(new Date().getTime() - new Date(p.date).getTime())} text={p.text}/>), [posts])

    return(
        <div className={'users'}>

        </div>
    )
}