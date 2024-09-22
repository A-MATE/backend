import { Expose, plainToInstance } from 'class-transformer';
import { IsDefined, IsEnum, IsString, validateOrReject } from 'class-validator';

enum RequestOrigin {
  MOBILE_APP = 'mobile_app',
  BACK_OFFICE_CLIENT = 'back_office_client',
  BACK_OFFICE_INTERNAL = 'back_office_internal',
}

class HeadersDTO {
  @IsString()
  @IsDefined()
  @IsEnum(RequestOrigin)
  @Expose({ name: 'x-origin' })
  public readonly 'x-origin': RequestOrigin;
}

async function testValidation() {
  const dto = plainToInstance(HeadersDTO, { 'x-origin': 'test' });
  try {
    await validateOrReject(dto);
    console.log('Validation passed, which is unexpected.');
  } catch (error) {
    console.log('Validation Errors:', error);
  }
}

testValidation();
