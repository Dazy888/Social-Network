import { Field, Int, ObjectType } from "@nestjs/graphql"
import { UserPreview } from "./userPreview.model"

@ObjectType()
export class Users {
    @Field(type => [UserPreview])
    users: UserPreview[]

    @Field(type => Int)
    length: number
}
