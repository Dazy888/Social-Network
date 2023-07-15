import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ProfileDocument = Profile & Document

@Schema({ collection: 'users_profiles', timestamps: true })
export class Profile {
    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop({ default: 'Nowhere' })
    location: string

    @Prop({ default: null })
    banner: string | null

    @Prop({ default: null })
    avatar: string | null

    @Prop({ default: 'Tell about yourself here.' })
    aboutMe: string

    @Prop({ default: 'Tell people about your hobbies here.' })
    hobbies: string

    @Prop({ default: 'Write your skills here.' })
    skills: string
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
