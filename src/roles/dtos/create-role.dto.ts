import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../@types/roles.types';

export class CreateRoleRequestDto {
  @ApiProperty({ enum: RoleEnum, description: 'Name of the role' })
  @IsNotEmpty()
  readonly role: RoleEnum;

  @ApiProperty({
    description: 'Description of the role',
  })
  @IsNotEmpty()
  readonly description: string;
}

export class CreateRoleResponseDto {
  @ApiProperty({ description: 'Unique identifier for the role' })
  readonly id: number;

  @ApiProperty({ enum: RoleEnum, description: 'Unique name of the role' })
  readonly name: RoleEnum;

  @ApiProperty({ description: 'Description of the role' })
  readonly description: string;
}
