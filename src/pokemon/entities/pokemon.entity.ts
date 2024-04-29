import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon  extends Document{
    @Prop({
        unique: true,
        index: true
    })
    nombre: string;
    @Prop({
        unique: true,
        index: true
    })
    no: number;
    @Prop({
        unique: false,
        index: true
    })
    tipo: string;
    @Prop({
        unique: false,
        index: true
    })
    fechaCreacion: string;
    @Prop({
        unique: false,
        index: true
    })
    fechaActualizacion: string;
}
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
