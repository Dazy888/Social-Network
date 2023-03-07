import { Field, ObjectType } from "@nestjs/graphql"
import { Post } from "./post.model"
import { UserData } from "./userData.model"

@ObjectType()
export class User {
    @Field(type => UserData)
    userData: UserData

    @Field(type => [Post])
    posts: Post[]
}
