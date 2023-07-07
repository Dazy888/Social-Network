import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ProfileDocument = Profile & Document

@Schema({ collection: 'users_profiles', timestamps: true })
export class Profile {
    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop({ default: null })
    location: string | null

    @Prop({ default: null })
    banner: string | null

    @Prop({ default: null })
    avatar: string | null

    @Prop({ default: null })
    aboutMe: string | null

    @Prop({ default: null })
    skills: string | null

    @Prop({ default: null })
    hobbies: string | null
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
