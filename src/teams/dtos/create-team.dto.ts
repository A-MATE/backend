import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

export class CreateTeamRequestDto {
  @ApiProperty({
    description: 'The name of the team',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The unique identifier of the organization',
  })
  @IsNotEmpty()
  @IsUUID()
  organizationId: string;

  @ApiProperty({
    description: 'A brief description or biography of the team',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Array of URLs for team logo',
    required: false,
  })
  @IsOptional()
  logo?: PhotoUrls;

  @ApiProperty({
    enum: TeamAgeCategory,
    description: 'The age group of the team (e.g., U18, U21)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    enum: TeamGender,
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
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
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The name of the team',
    example: 'U18 Soccer Team',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The unique identifier of the organization owning the team',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @Expose()
  organizationId: string;

  @ApiProperty({
    description: 'A brief description or biography of the team',
    required: false,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Array of URLs for team logo',
    required: false,
  })
  @Expose()
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The age group of the team (e.g., U18, U21)',
    required: false,
  })
  @Expose()
  ageGroup?: TeamAgeCategory;

  @ApiProperty({
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
    required: false,
  })
  @Expose()
  gender?: TeamGender;

  @ApiProperty({
    description: 'The date and time the team was created',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the team was deleted (if applicable)',
    required: false,
  })
  @Expose()
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'A boolean indicating whether the team is active',
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'The date and time the team was last updated',
    required: false,
  })
  @Expose()
  updatedAt: Date | null;

  @Exclude()
  organization?: Organization;
}
