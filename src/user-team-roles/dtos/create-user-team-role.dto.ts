import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserTeamRoleDto {
  @IsNotEmpty()
  readonly roleId: string;
}

export class CreateUserTeamRoleResponseDto {
  @ApiProperty({ description: 'ID of the user' })
  readonly userId: string;

  @ApiProperty({ description: 'ID of the team' })
  readonly teamId: string;

  @ApiProperty({ description: 'ID of the assigned role' })
  readonly roleId: string;

  @ApiProperty({
    description: 'ID of the association between the user, team, and role',
  })
  readonly id: string;
}
