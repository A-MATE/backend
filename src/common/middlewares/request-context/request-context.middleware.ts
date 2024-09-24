import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestOrigin } from 'src/common/@types/request-origin.enum';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['x-client-id'];
    const origin = req.headers['x-origin'] as RequestOrigin;

    if (!origin) {
      throw new BadRequestException('Request origin is required.');
    }

    if (!clientId) {
      throw new BadRequestException('x-client-id header is required.');
    }

    req['origin'] = origin;

    switch (origin) {
      case RequestOrigin.MOBILE_APP:
        req['teamId'] = clientId;
        break;

      case RequestOrigin.BACK_OFFICE_CLIENT:
      case RequestOrigin.BACK_OFFICE_INTERNAL:
        req['organizationId'] = clientId;
        break;

      default:
        throw new BadRequestException('Invalid request origin.');
    }

    next();
  }
}
