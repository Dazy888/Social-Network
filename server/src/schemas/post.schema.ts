import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type PostDocument = Post & Document

@Schema({ collection: 'users_posts', timestamps: true })
export class Post {
    @Prop()
    userId: string

    @Prop()
    text: string
}

export const PostSchema = SchemaFactory.createForClass(Post)
