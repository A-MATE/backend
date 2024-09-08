import { ApiProperty } from '@nestjs/swagger';

export class GetAllTeamsResponseDto {
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
  ageGroup?: string;

  @ApiProperty({
    description: 'The gender of the team (e.g., Male, Female, Mixed)',
    example: 'Male',
    required: false,
  })
  gender?: string;
}
