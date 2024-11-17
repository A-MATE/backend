import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from '../@types/match-status.enum';

export class CreateMatchRequestDto {
  @ApiProperty()
  teamId: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  homeTeamId: string;

  @ApiProperty()
  awayTeamId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  sport: string;
}

export class CreateMatchResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  sport: string;

  @ApiProperty()
  teamId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  homeTeamId: string;

  @ApiProperty()
  awayTeamId: string;

  @ApiProperty()
  homeTeamScore: number;

  @ApiProperty()
  awayTeamScore: number;

  @ApiProperty({
    enum: MatchStatus,
    description: 'The status of the match',
  })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
