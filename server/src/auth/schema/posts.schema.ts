import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PostsDocument = Posts & Document
@Schema()
export class Posts {
    @Prop()
    user: string

    @Prop()
    date: string

    @Prop()
    text: string
    @Prop()
    postId: string
}
export const PostsSchema = SchemaFactory.createForClass(Posts)