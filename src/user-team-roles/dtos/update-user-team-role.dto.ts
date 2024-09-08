import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserTeamRoleDto {
  @IsNotEmpty()
  readonly roleId: number;
}

export class UpdateUserTeamRoleResponseDto {
  @ApiProperty({ description: 'ID of the user' })
  readonly userId: number;

  @ApiProperty({ description: 'ID of the team' })
  readonly teamId: number;

  @ApiProperty({ description: 'ID of the assigned role' })
  readonly roleId: number;

  @ApiProperty({
    description: 'ID of the association between the user, team, and role',
  })
  readonly id: number;
}
