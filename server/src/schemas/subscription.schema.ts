import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type SubscriptionDocument = Subscription & Document

@Schema({ collection: 'users_subscriptions', timestamps: true })
export class Subscription {
    @Prop()
    userId: string

    @Prop()
    followedUserId: string
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)
