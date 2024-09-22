import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RequestHeadersOptions } from '../@types/request-headers-options.type';

export const RequestHeaders = createParamDecorator(
  async (options: RequestHeadersOptions, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    const dto = plainToInstance(options.dtoClass, headers, {
      excludeExtraneousValues: true,
    });

    if (!options.omitClientId && !dto['x-client-id']) {
      throw new BadRequestException('x-client-id header is required');
    }

    try {
      await validateOrReject(dto);
    } catch (error) {
      console.error('Validation Errors:', error);
      throw new BadRequestException('Invalid headers: ' + error);
    }

    return dto;
  },
);
