import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Post {
    @Field()
    user: string

    @Field()
    date: string

    @Field()
    text: string

    @Field()
    postId: string
}
