import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities';
import { PokemonResponse } from './interfaces';

@Injectable()
export class SeedService {
	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,

		private readonly http: AxiosAdapter,
	) {}

	async executeSeed(limit = 10) {
		const data = await this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

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
