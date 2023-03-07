import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserData {
    @Field()
    name: string

    @Field()
    location: string

    @Field()
    banner: string

    @Field()
    avatar: string

    @Field()
    aboutMe: string

    @Field()
    skills: string

    @Field()
    hobbies: string

    @Field(type => [String])
    followers: string[]

    @Field(type => [String])
    following: string[]
}
