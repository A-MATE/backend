import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CustomHeaders } from 'src/common/@types/headers.enum';
import { RequestOrigin } from 'src/common/@types/request-origin.enum';
import { RequestHeaders } from 'src/common/decorators/request-headers.decorator';
import { HeadersDTO } from 'src/common/dtos/headers.dto';
import { SigninResponseDto } from '../dtos/signin-reponse.dto';
import { SignInRequestDto } from '../dtos/signin-request.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiHeader({
    name: 'x-client-id',
    description: 'Team ID or Organization ID',
    required: true,
  })
  @ApiHeader({
    name: 'x-origin',
    description: `Request origin. Valid values: ${Object.values(RequestOrigin).join(', ')}`,
    required: true,
  })
  @ApiBody({ type: SignInRequestDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    type: SigninResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedException,
  })
  async signIn(
    @RequestHeaders({ dtoClass: HeadersDTO, omitClientId: true })
    headers: HeadersDTO,
    @Body() body: SignInRequestDto,
  ): Promise<SigninResponseDto> {
    const origin = headers[CustomHeaders.ORIGIN];
    const clientId = headers[CustomHeaders.CLIENT_ID];

    switch (origin) {
      case RequestOrigin.MOBILE_APP:
        const mobileUser = await this.authService.validateUser(
          body.email,
          body.password,
          clientId,
        );
        if (!mobileUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(mobileUser);

      case RequestOrigin.BACK_OFFICE_CLIENT:
        const backOfficeClientUser = await this.authService.validateUser(
          body.email,
          body.password,
          clientId,
        );
        if (!backOfficeClientUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(backOfficeClientUser);

      case RequestOrigin.BACK_OFFICE_INTERNAL:
        const backOfficeInternalUser = await this.authService.validateUser(
          body.email,
          body.password,
          clientId,
        );
        if (!backOfficeInternalUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(backOfficeInternalUser);

      default:
        throw new UnauthorizedException('Invalid platform');
    }
  }
}
