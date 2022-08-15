import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
	@IsInt()
	@IsPositive()
	@IsNotEmpty()
	@Min(1)
	no: number;

	@IsString()
	@IsNotEmpty()
	name: string;
}
