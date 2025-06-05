import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import {
  CreateTeamRequestDto,
  CreateTeamResponseDto,
} from '../dtos/create-team.dto';
import { GetAllTeamsResponseDto } from '../dtos/get-all-teams.dto';
import { GetTeamByIdResponseDto } from '../dtos/get-one-team.dto';
import {
  UpdateTeamRequestDto,
  UpdateTeamResponseDto,
} from '../dtos/update-team.dto';
import { TeamsService } from '../services/teams.service';

@Controller('teams')
@ApiTags('Teams API')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({ status: 201, type: CreateTeamResponseDto })
  async createTeam(
    @Body() body: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    const { name, description, logo, ageGroup, gender, organizationId } = body;
    return this.teamsService.createTeam(
      name,
      description,
      logo,
      ageGroup,
      gender,
      organizationId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({ status: 200, type: [GetAllTeamsResponseDto] })
  async getAllTeams(
    @Query('withSoftDeleted') withSoftDeleted?: boolean,
  ): Promise<GetAllTeamsResponseDto[]> {
    return this.teamsService.getAllTeams(withSoftDeleted);
  }

  @Get(':teamId')
  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiResponse({
    status: 200,
    type: GetTeamByIdResponseDto,
  })
  async getTeamById(
    @Param('teamId') teamId: string,
  ): Promise<GetTeamByIdResponseDto> {
    return this.teamsService.getTeamById(teamId);
  }

  @Patch(':teamId')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({ status: 200, type: UpdateTeamResponseDto })
  async updateTeam(
    @Param('teamId') teamId: string,
    @Body() body: UpdateTeamRequestDto,
  ): Promise<UpdateTeamResponseDto> {
    const { name, description, logo, ageGroup, gender } = body;
    return this.teamsService.updateTeam(
      teamId,
      name,
      description,
      logo,
      ageGroup,
      gender,
    );
  }

  @Delete(':teamId')
  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({
    status: 200,
    type: GetTeamByIdResponseDto,
  })
  async deleteTeamById(
    @Param('teamId') teamId: string,
    @Query('hard') hard?: boolean,
  ): Promise<GetTeamByIdResponseDto> {
    return hard
      ? await this.teamsService.hardDeleteTeamById(teamId)
      : await this.teamsService.softDeleteTeamById(teamId);
  }
}
