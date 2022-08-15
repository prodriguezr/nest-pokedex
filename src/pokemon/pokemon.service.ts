import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities';

@Injectable()
export class PokemonService {
	constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>) {}

	async create(createPokemonDto: CreatePokemonDto) {
		createPokemonDto.name = createPokemonDto.name.toLowerCase();

		try {
			const pokemon = await this.pokemonModel.create(createPokemonDto);

			return pokemon;
		} catch (error) {
			this.handleExceptions(error);
		}
	}

	async findAll() {
		const pokemons = await this.pokemonModel.find();

		return pokemons;
	}

	async findOne(id: string) {
		let pokemon: Pokemon;

		if (!isNaN(Number(id))) pokemon = await this.pokemonModel.findOne({ no: id });

		if (!pokemon && isValidObjectId(id)) pokemon = await this.pokemonModel.findById(id);

		if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase().trim() });

		if (!pokemon) throw new NotFoundException(`Pokemon with id, no or name (${id}) not found`);

		return pokemon;
	}

	async update(id: string, updatePokemonDto: UpdatePokemonDto) {
		const pokemon = await this.findOne(id);

		if (updatePokemonDto.name) updatePokemonDto.name.toLowerCase();

		try {
			await pokemon.updateOne(updatePokemonDto);

			return { ...pokemon.toJSON(), ...updatePokemonDto };
		} catch (error) {
			this.handleExceptions(error);
		}
	}

	async remove(id: string) {
		const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

		if (deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" not found`);

		return;
	}

	private handleExceptions(error: any) {
		if (error.code === 11000)
			throw new BadRequestException(`Pokemon already exists in DB: ${JSON.stringify(error.keyValue)}`);

		console.log(error);
		throw new InternalServerErrorException('Unhandled error - Contact with the Administrator');
	}
}
