import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMatchRequestDto,
  CreateMatchResponseDto,
} from '../dtos/create-match.dto';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly repository: Repository<Match>,
  ) {}

  async create(match: CreateMatchRequestDto): Promise<CreateMatchResponseDto> {
    const newMatch = this.repository.create(match);
    return await this.repository.save(newMatch);
  }

  async listByTeamId(teamId: string): Promise<CreateMatchResponseDto[]> {
    return await this.repository.find({ where: { teamId } });
  }
}
