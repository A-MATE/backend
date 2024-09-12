import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDate()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  avatar?: PhotoUrls;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
