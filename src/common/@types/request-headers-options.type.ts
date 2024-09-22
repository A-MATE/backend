import { HeadersDTO } from '../dtos/headers.dto';

export type RequestHeadersOptions = {
  dtoClass: new () => HeadersDTO;
  omitClientId?: boolean;
};
