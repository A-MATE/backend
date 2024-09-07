import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly description: string;
}
