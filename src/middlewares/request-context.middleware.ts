import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Platform } from 'src/common/@types/platform.type';

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

    if (!Object.values(Platform).includes(platform as Platform)) {
      throw new BadRequestException(`Invalid platform: ${platform}`);
    }

    req['clientId'] = clientId;
    req['platform'] = platform;

    next();
  }
}
