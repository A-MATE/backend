import { Injectable } from '@nestjs/common';
import { MatchesRepository } from '../repositories/matches.repository';
import { CreateMatchRequestDto } from '../dtos/create-match.dto';
import { Match } from '../entities/match.entity';
import { FilterMatchesDto } from '../dtos/filter-matches.dto';

@Injectable()
export class MatchesService {
  constructor(private readonly matchesRepository: MatchesRepository) {}

  async create(dto: CreateMatchRequestDto): Promise<Match> {
    return this.matchesRepository.create(dto);
  }

  async update(
    id: string,
    dto: Partial<CreateMatchRequestDto>,
  ): Promise<Match> {
    return this.matchesRepository.update(id, dto);
  }

  async findById(id: string): Promise<Match | null> {
    return this.matchesRepository.findById(id);
  }

  async delete(id: string): Promise<void> {
    return this.matchesRepository.delete(id);
  }
  async list(filters: FilterMatchesDto) {
    return this.matchesRepository.list(filters);
  }
}
