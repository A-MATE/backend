import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['x-client-id'];
    const platform = req.headers['x-platform'];

    if (!clientId) {
      throw new BadRequestException('Client ID is missing');
    }

    if (!platform) {
      throw new BadRequestException('Platform is missing');
    }

    req['clientId'] = clientId;
    req['platform'] = platform;

    next();
  }
}
