import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    login: string

    @Prop()
    password: string

    @Prop()
    isActivated: boolean

    @Prop()
    activationLink: string | null

    @Prop()
    email: string | null

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
    followers: string[]

    @Prop()
    following: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
