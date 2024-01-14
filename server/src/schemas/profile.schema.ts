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
    aboutUserText: string | null

    @Prop({ default: null })
    userHobbiesText: string | null

    @Prop({ default: null })
    userSkillsText: string | null
}
export const ProfileSchema = SchemaFactory.createForClass(Profile)
