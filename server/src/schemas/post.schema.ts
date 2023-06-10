import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
    @Prop()
    userId: string

    @Prop()
    text: string

    @Prop()
    postId: string
}

export const PostSchema = SchemaFactory.createForClass(Post)
