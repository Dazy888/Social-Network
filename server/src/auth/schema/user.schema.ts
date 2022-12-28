import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    password: string

    @Prop()
    userLogin: string

    @Prop()
    isActivated: boolean

    @Prop()
    activationLink: string

    @Prop()
    email: string

    @Prop()
    name: string

    @Prop()
    location: string

    @Prop()
    banner: string

    @Prop()
    avatar: string

    @Prop()
    aboutMe: string

    @Prop()
    skills: string

    @Prop()
    hobbies: string

    @Prop()
    userId: string
}

export const UserSchema = SchemaFactory.createForClass(User)