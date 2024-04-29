import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
const { format } = require('date-fns');
@Injectable()
export class SeedService {
  async poblarDB() {
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
    const pokemons = data.results
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');
    pokemons.forEach(({name, url}) => {
       const segmentos = url.split('/');
       const no = +segmentos[segmentos.length - 2];
       console.log(name, no, url,fechaFormateada)
    })
    return pokemons
  }
}
