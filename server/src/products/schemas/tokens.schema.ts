import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type TokensDocument = Tokens & Document

@Schema()
export class Tokens {
    @Prop()
    userId: string

    @Prop()
    refreshToken: string
}

export const TokensSchema = SchemaFactory.createForClass(Tokens)