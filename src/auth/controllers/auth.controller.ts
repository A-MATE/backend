import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { RequestOrigin } from 'src/common/@types/request-origin.enum';
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
    description: 'Client ID (can be TeamID or OrganizationID)',
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
  })
  async signIn(
    @Req() req: Request,
    @Body() body: SignInRequestDto,
  ): Promise<SigninResponseDto> {
    const origin = req['origin'];

    switch (origin) {
      case RequestOrigin.MOBILE_APP:
        const teamId = req['teamId'];

        const mobileUser = await this.authService.validateUser(
          body.email,
          body.password,
          teamId,
        );
        if (!mobileUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(mobileUser);

      case RequestOrigin.BACK_OFFICE_CLIENT:
        const organizationId = req['organizationId'];

        const backOfficeClientUser = await this.authService.validateUser(
          body.email,
          body.password,
          organizationId,
        );
        if (!backOfficeClientUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(backOfficeClientUser);

      default:
        throw new UnauthorizedException('Invalid platform');
    }
  }
}
