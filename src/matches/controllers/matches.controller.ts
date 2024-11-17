import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateMatchRequestDto,
  CreateMatchResponseDto,
} from '../dtos/create-match.dto';
import { MatchesService } from '../services/matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({
    status: 201,
    type: CreateMatchResponseDto,
  })
  create(@Body() matchData: CreateMatchRequestDto) {
    console.log('====================================');
    console.log('MatchesController -> create -> matchData', matchData);
    console.log('====================================');
    return this.matchesService.create(matchData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches by teamId' })
  @ApiResponse({
    status: 200,
    type: [CreateMatchResponseDto],
  })
  listByTeamId(teamId: string) {
    return this.matchesService.listByTeamId(teamId);
  }
}
