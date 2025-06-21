import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MatchesService } from '../services/matches.service';
import { CreateMatchRequestDto } from '../dtos/create-match.dto';
import { Match } from '../entities/match.entity';
import { FilterMatchesDto } from '../dtos/filter-matches.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async create(@Body() dto: CreateMatchRequestDto): Promise<Match> {
    return this.matchesService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMatchRequestDto>,
  ): Promise<Match> {
    return this.matchesService.update(id, dto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Match | null> {
    return this.matchesService.findById(id);
  }

  @Get()
  async listFiltered(@Query() filters: FilterMatchesDto) {
    return this.matchesService.list(filters);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.matchesService.delete(id);
  }
}
