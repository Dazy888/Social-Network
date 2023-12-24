import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type FollowDocument = Follow & Document

@Schema({ collection: 'users_follows', timestamps: true })
export class Follow {
    @Prop()
    followerId: string

    @Prop()
    followeeId: string
}
export const FollowSchema = SchemaFactory.createForClass(Follow)
