import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../@types/roles.types';

export class GetAllRolesResponseDto {
  @ApiProperty({ description: 'Unique identifier for the role' })
  readonly id: number;

  @ApiProperty({ enum: RoleEnum, description: 'Unique name of the role' })
  readonly name: RoleEnum;

  @ApiProperty({ description: 'Description of the role' })
  readonly description: string;
}
