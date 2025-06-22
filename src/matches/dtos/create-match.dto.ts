import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from '../@types/match-status.enum';
import { Sports } from 'src/common/@types/sports.enum';

export class CreateMatchRequestDto {
  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  homeTeamId: string;

  @ApiProperty()
  awayTeamId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ nullable: true })
  locationId?: string;

  @ApiProperty({ enum: Sports })
  sport: Sports;

  @ApiProperty({
    enum: MatchStatus,
    default: MatchStatus.SCHEDULED,
    required: false,
  })
  status?: MatchStatus;

  @ApiProperty({ nullable: true, required: false })
  homeTeamScore?: number;

  @ApiProperty({ nullable: true, required: false })
  awayTeamScore?: number;
}

export class CreateMatchResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty({ nullable: true })
  locationId: string;

  @ApiProperty({ enum: Sports })
  sport: Sports;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  homeTeamId: string;

  @ApiProperty()
  awayTeamId: string;

  @ApiProperty({ nullable: true })
  homeTeamScore: number;

  @ApiProperty({ nullable: true })
  awayTeamScore: number;

  @ApiProperty({
    enum: MatchStatus,
    description: 'The status of the match',
  })
  status: MatchStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
