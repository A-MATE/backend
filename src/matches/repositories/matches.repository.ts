import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchRequestDto } from '../dtos/create-match.dto';
import { Match } from '../entities/match.entity';
import { FilterMatchesDto } from '../dtos/filter-matches.dto';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly repository: Repository<Match>,
  ) {}

  async create(match: CreateMatchRequestDto): Promise<Match> {
    const newMatch = this.repository.create({
      organizationId: match.organizationId,
      date: match.date,
      locationId: match.locationId,
      sport: match.sport,
      status: match.status,
      homeTeam: { id: match.homeTeamId } as Team,
      awayTeam: { id: match.awayTeamId } as Team,
      homeTeamScore: match.homeTeamScore,
      awayTeamScore: match.awayTeamScore,
    });
    return await this.repository.save(newMatch);
  }

  async update(
    id: string,
    match: Partial<CreateMatchRequestDto>,
  ): Promise<Match> {
    const updateData: Partial<Match> = {};

    if (match.organizationId !== undefined)
      updateData.organizationId = match.organizationId;
    if (match.date !== undefined) updateData.date = match.date;
    if (match.locationId !== undefined)
      updateData.locationId = match.locationId;
    if (match.sport !== undefined) updateData.sport = match.sport;
    if (match.status !== undefined) updateData.status = match.status;
    if (match.homeTeamScore !== undefined)
      updateData.homeTeamScore = match.homeTeamScore;
    if (match.awayTeamScore !== undefined)
      updateData.awayTeamScore = match.awayTeamScore;
    if (match.homeTeamId !== undefined)
      updateData.homeTeam = { id: match.homeTeamId } as Team;
    if (match.awayTeamId !== undefined)
      updateData.awayTeam = { id: match.awayTeamId } as Team;

    await this.repository.update(id, updateData);

    const query = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .where('match.id = :id', { id })
      .andWhere('match.deletedAt IS NULL');

    return await query.getOne();
  }

  async findById(id: string): Promise<Match | null> {
    const query = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .where('match.id = :id', { id })
      .andWhere('match.deletedAt IS NULL');

    return await query.getOne();
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
    const {
      organizationId,
      teamId,
      status,
      sport,
      page = 1,
      limit = 20,
    } = filters;

    const query = this.repository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .where('match.deletedAt IS NULL');

    if (organizationId) {
      query.andWhere('match.organizationId = :organizationId', {
        organizationId,
      });
    }

    if (teamId) {
      query.andWhere('(homeTeam.id = :teamId OR awayTeam.id = :teamId)', {
        teamId,
      });
    }

    if (status) {
      query.andWhere('match.status = :status', { status });
    }

    if (sport) {
      query.andWhere('match.sport = :sport', { sport });
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }
}
