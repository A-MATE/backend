import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity';

export class GetTeamByIdResponseDto {
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
    example: 'The under-18 soccer team',
    required: false,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Array of URLs for team logo',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  @Expose()
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  @Expose()
  ageGroup?: string;

  @ApiProperty({
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
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
