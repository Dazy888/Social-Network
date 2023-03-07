import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserPreview {
    @Field()
    userId: string

    @Field()
    name: string

    @Field()
    location: string

    @Field()
    avatar: string
}
