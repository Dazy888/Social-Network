import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type TokenDocument = Token & Document

@Schema({ collection: 'users_tokens', timestamps: true })
export class Token {
    @Prop()
    userId: string

    @Prop()
    refreshToken: string
}
export const TokenSchema = SchemaFactory.createForClass(Token)
