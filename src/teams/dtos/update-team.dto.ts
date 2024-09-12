import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
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
    description: 'Updated array of URLs for team logo',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  @IsOptional()
  logo?: PhotoUrls;

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
  id: string;

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
    description: 'Updated array of URLs for team logo',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  logo?: PhotoUrls;

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
  @ApiProperty({
    description: 'The date and time the team was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the team was deleted (if applicable)',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'A boolean indicating whether the team is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The date and time the team was last updated',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  updatedAt: Date | null;
}
