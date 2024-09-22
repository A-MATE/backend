import { Expose } from 'class-transformer';
import { IsDefined, IsEnum, IsString } from 'class-validator';
import { CustomHeaders } from '../@types/headers.enum';
import { RequestOrigin } from '../@types/request-origin.enum';

export class HeadersDTO {
  @IsString()
  @IsDefined()
  @Expose({ name: CustomHeaders.CLIENT_ID })
  public readonly 'client-id': string;

  @IsString()
  @IsDefined()
  @IsEnum(RequestOrigin)
  @Expose({ name: 'x-origin' })
  public readonly 'x-origin': RequestOrigin;
}
