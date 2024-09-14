import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty({
    description: 'The JWT token',
  })
  access_token: string;
}
