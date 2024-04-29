import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try{
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    }catch(error){
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const pokemons =await this.pokemonModel.find().exec();
    return pokemons;
  }

  async findOne(terminoXbuscar: string) {
    let pokemon:Pokemon;
    // buscar por no
    if(!isNaN(+terminoXbuscar)){
      pokemon = await this.pokemonModel.findOne({no: terminoXbuscar}).exec();
    }
    // buscar por id
    if(!pokemon && isValidObjectId(terminoXbuscar)){
      pokemon = await this.pokemonModel.findById(terminoXbuscar).exec();
    }
    // buscar por nombre
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({nombre: terminoXbuscar}).exec();
    }

    if(!pokemon){
      throw new NotFoundException('No existe el pokemon: '+terminoXbuscar);
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    try{
      const updatedPokemon = await this.pokemonModel.findByIdAndUpdate(id, updatePokemonDto,{new:true}).exec();
      return updatedPokemon;
    }catch(error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const deletedPokemon =await this.pokemonModel.findByIdAndDelete(id).exec();
    if(!deletedPokemon){
      throw new NotFoundException('No existe el pokemon con id: '+id);
    }
    return deletedPokemon;
    // return id
  }


  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`El pokemon ${JSON.stringify(error.keyValue)} ya existe en la base de datos`);
    }
    throw new InternalServerErrorException('Error en el servidor');
  }
}
