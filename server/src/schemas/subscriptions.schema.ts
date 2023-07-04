import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type SubscriptionsDocument = Subscriptions & Document

@Schema({ timestamps: true })
export class Subscriptions {
    @Prop()
    userId: string

    @Prop()
    followers: string[]

    @Prop()
    following: string[]
}

export const SubscriptionsSchema = SchemaFactory.createForClass(Subscriptions)
