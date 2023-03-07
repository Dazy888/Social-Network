import { gql } from "@apollo/client"

export const GET_USERS = gql`
    query getUsers($id: String!, $skip: Int!) {
        getUsers(id: $id, skip: $skip) {
            users {
                userId,
                name,
                location,
                avatar
            },
            length
        }
    }
`
