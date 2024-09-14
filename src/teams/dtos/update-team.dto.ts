import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity';
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
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The updated name of the team',
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
    description: 'The updated description or biography of the team',
    example: 'The under-18 soccer team',
    required: false,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Updated array of URLs for team logo',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  @Expose()
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The updated age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  @Expose()
  ageGroup?: string;

  @ApiProperty({
    description: 'The updated gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  @Expose()
  gender?: string;

  @ApiProperty({
    description: 'The date and time the team was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the team was deleted (if applicable)',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @Expose()
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'The date and time the team was last updated',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @Expose()
  updatedAt: Date | null;

  @ApiProperty({
    description: 'A boolean indicating whether the team is active',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @Exclude()
  organization?: Organization;
}
