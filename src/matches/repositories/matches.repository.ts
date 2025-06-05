import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMatchRequestDto,
  CreateMatchResponseDto,
} from '../dtos/create-match.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MatchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(match: CreateMatchRequestDto): Promise<CreateMatchResponseDto> {
    const newMatch = await this.prisma.match.create({
      data: match,
    });

    return plainToInstance(CreateMatchResponseDto, newMatch);
  }

  async listByTeamId(teamId: string): Promise<CreateMatchResponseDto[]> {
    const matches = await this.prisma.match.findMany({
      where: { teamId },
    });

    return matches.map(match => plainToInstance(CreateMatchResponseDto, match));
  }
}
