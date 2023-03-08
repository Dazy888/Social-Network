import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop()
    userId: mongoose.Schema.Types.ObjectId

    @Prop()
    refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)
