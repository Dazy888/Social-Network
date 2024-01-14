import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({ default: false })
    activatedEmail: boolean

    @Prop({ default: null })
    emailActivationLink: string | null

    @Prop({ default: null })
    email: string | null

    @Prop({ default: null })
    passRecoveryLink: string | null
}
export const UserSchema = SchemaFactory.createForClass(User)
