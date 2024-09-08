import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

export class UpdateTeamRequestDto {
  @ApiProperty({
    description: 'The updated name of the team',
    example: 'U18 Soccer Team',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The updated description or biography of the team',
    example: 'The under-18 soccer team',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Updated array of URLs for team logos',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  @IsOptional()
  logos?: string[];

  @ApiProperty({
    enum: TeamAgeCategory,
    description: 'The updated age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  @IsOptional()
  @IsString()
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    enum: TeamGender,
    description: 'The updated gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  @IsOptional()
  @IsString()
  gender?: TeamGender;
}

export class UpdateTeamResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the team',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The updated name of the team',
    example: 'U18 Soccer Team',
  })
  name: string;

  @ApiProperty({
    description: 'The updated description or biography of the team',
    example: 'The under-18 soccer team',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Updated array of URLs for team logos',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  logos?: string[];

  @ApiProperty({
    description: 'The updated age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  ageGroup?: string;

  @ApiProperty({
    description: 'The updated gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  gender?: string;
}
