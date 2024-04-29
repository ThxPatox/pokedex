import { IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsString()
    nombre: string;
    @IsNumber()
    @IsPositive()
    no: number;
    @IsString()
    tipo: string;
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    fechaCreacion: string;
}
