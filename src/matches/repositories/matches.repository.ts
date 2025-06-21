import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchRequestDto } from '../dtos/create-match.dto';
import { Match } from '../entities/match.entity';
import { FilterMatchesDto } from '../dtos/filter-matches.dto';

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly repository: Repository<Match>,
  ) {}

  async create(match: CreateMatchRequestDto): Promise<Match> {
    const newMatch = this.repository.create(match);
    return await this.repository.save(newMatch);
  }

  async update(id: string, match: Partial<Match>): Promise<Match> {
    await this.repository.update(id, match);
    return await this.repository.findOne({ where: { id } });
  }

  async findById(id: string): Promise<Match | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async list(filters: FilterMatchesDto): Promise<{
    data: Match[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { organizationId, teamId, status, page = 1, limit = 20 } = filters;

    const query = this.repository
      .createQueryBuilder('match')
      .where('match.deletedAt IS NULL');

    if (organizationId) {
      query.andWhere('match.organizationId = :organizationId', {
        organizationId,
      });
    }

    if (teamId) {
      query.andWhere('match.teamId = :teamId', { teamId });
    }

    if (status) {
      query.andWhere('match.status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }
}
