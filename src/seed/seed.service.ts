import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities';
import { PokemonResponse } from './interfaces';

@Injectable()
export class SeedService {
	constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

	private readonly axios: AxiosInstance = axios;

	async executeSeed(limit = 10) {
		const { data } = await this.axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

		await this.pokemonModel.deleteMany();

		const pokemonToInsert: { name: string; no: number }[] = [];

		data.results.forEach(({ name, url }) => {
			const segments = url.split('/');

			const no = +segments[segments.length - 2];

			pokemonToInsert.push({ name, no });
		});

		await this.pokemonModel.insertMany(pokemonToInsert);

		return { message: 'Seed executed' };
	}
}
