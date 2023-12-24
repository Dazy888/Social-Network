import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ProfileDocument = Profile & Document

@Schema({ collection: 'users_profiles', timestamps: true })
export class Profile {
    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop()
    location: string

    @Prop()
    banner: string | null

    @Prop()
    avatar: string | null

    @Prop()
    aboutUserText: string

    @Prop()
    userHobbiesText: string

    @Prop()
    userSkillsText: string
}
export const ProfileSchema = SchemaFactory.createForClass(Profile)
