import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUserTeamRequestDto {
  @ApiProperty({
    description: 'ID of the user to be associated with a team',
    example: 1,
  })
  @IsInt()
  userId: string;

  @ApiProperty({
    description: 'ID of the team to which the user will be associated',
    example: 1,
  })
  @IsInt()
  teamId: string;
}
