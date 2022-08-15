import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Get(':limit')
	executeSeed(@Param('limit', ParseIntPipe) limit: number) {
		return this.seedService.executeSeed(limit);
	}
}
