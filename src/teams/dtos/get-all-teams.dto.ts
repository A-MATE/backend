import { ApiProperty } from '@nestjs/swagger';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';

export class GetAllTeamsResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the team',
    example: 1,
  })
  id: string;

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
    description: 'Array of URLs for team logo',
    example: ['http://example.com/logo1.png', 'http://example.com/logo2.png'],
    required: false,
  })
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The age group of the team (e.g., U18, U21)',
    example: 'U18',
    required: false,
  })
  ageGroup?: string;

  @ApiProperty({
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
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
