import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose, {Document} from "mongoose"

export type TokensDocument = Tokens & Document

@Schema()
export class Tokens {
    @Prop()
    user: mongoose.Schema.Types.ObjectId

    @Prop()
    refreshToken: string
}

export const TokensSchema = SchemaFactory.createForClass(Tokens)