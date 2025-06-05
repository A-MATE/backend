// create-team.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

export class CreateTeamRequestDto {
  @ApiProperty({ description: 'The name of the team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The unique identifier of the organization' })
  @IsNotEmpty()
  @IsUUID()
  organizationId: string;

  @ApiProperty({ description: 'Team description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Logo URL', required: false })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    enum: TeamAgeCategory,
    description: 'The age group of the team',
    required: false,
  })
  @IsOptional()
  @IsEnum(TeamAgeCategory)
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    enum: TeamGender,
    description: 'The gender of the team',
    required: false,
  })
  @IsOptional()
  @IsEnum(TeamGender)
  gender?: TeamGender;
}

export class CreateTeamResponseDto {
  @ApiProperty({ description: 'Team ID', example: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Team name' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Owning organization ID' })
  @Expose()
  organizationId: string;

  @ApiProperty({ description: 'Team description', required: false })
  @Expose()
  description?: string;

  @ApiProperty({ description: 'Logo URL', required: false })
  @Expose()
  logo?: string;

  @ApiProperty({ enum: TeamAgeCategory, required: false })
  @Expose()
  ageGroup?: TeamAgeCategory;

  @ApiProperty({ enum: TeamGender, required: false })
  @Expose()
  gender?: TeamGender;

  @ApiProperty({ description: 'Created at' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Deleted at', required: false })
  @Expose()
  deletedAt?: Date | null;

  @ApiProperty({ description: 'Is active' })
  @Expose()
  isActive: boolean;

  @ApiProperty({ description: 'Updated at', required: false })
  @Expose()
  updatedAt: Date | null;

  @Exclude()
  organization?: any;
}
