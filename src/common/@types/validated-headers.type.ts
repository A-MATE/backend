import { RequestOrigin } from './request-origin.enum';

export type ValidatedHeaders = {
  origin: RequestOrigin;
  clientId?: string;
};
