import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    @Prop()
    userName: string

    @Prop()
    pass: string

    @Prop({ default: false })
    isActivated: boolean

    @Prop({ default: null })
    activationLink: string | null

    @Prop({ default: null })
    email: string | null
}

export const UserSchema = SchemaFactory.createForClass(User)
