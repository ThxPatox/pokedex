import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
const { format } = require('date-fns');
@Injectable()
export class SeedService {
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async poblarDB() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    const pokemonToInsert: { nombre: string, no: number, fechaCreacion: string }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ nombre: name, no, fechaCreacion: format(new Date(), 'yyyy-MM-dd') });

    });

    await this.pokemonModel.insertMany(pokemonToInsert);


    return 'Seed Executed';
  }
}
