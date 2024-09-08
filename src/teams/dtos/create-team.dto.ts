import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

export class CreateTeamRequestDto {
  @ApiProperty({
    description: 'The name of the team',
    example: 'U18 Soccer Team',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description or biography of the team',
    example: 'The under-18 soccer team',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Array of URLs for team logos',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  @IsOptional()
  logos?: string[];

  @ApiProperty({
    enum: TeamAgeCategory,
    description: 'The age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  @IsOptional()
  @IsString()
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    enum: TeamGender,
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  @IsOptional()
  @IsString()
  gender?: TeamGender;
}

export class CreateTeamResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the team',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the team',
    example: 'U18 Soccer Team',
  })
  name: string;

  @ApiProperty({
    description: 'A brief description or biography of the team',
    example: 'The under-18 soccer team',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Array of URLs for team logos',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  logos?: string[];

  @ApiProperty({
    description: 'The age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  gender?: TeamGender;
}
