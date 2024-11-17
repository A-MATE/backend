import { Injectable } from '@nestjs/common';
import {
  CreateMatchRequestDto,
  CreateMatchResponseDto,
} from '../dtos/create-match.dto';
import { MatchesRepository } from '../repositories/matches.repository';

@Injectable()
export class MatchesService {
  constructor(private readonly repository: MatchesRepository) {}
  async create(
    matchData: CreateMatchRequestDto,
  ): Promise<CreateMatchResponseDto> {
    return await this.repository.create(matchData);
  }

  async listByTeamId(teamId: string): Promise<CreateMatchResponseDto[]> {
    return await this.repository.listByTeamId(teamId);
  }
}
