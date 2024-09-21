import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CustomHeaders } from 'src/common/@types/headers.type';
import { Platform } from 'src/common/@types/platform.type';
import { SigninResponseDto } from '../dtos/signin-reponse.dto';
import { SignInRequestDto } from '../dtos/signin-request.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
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
    @Body() body: SignInRequestDto,
    @Req() req: Request,
  ): Promise<SigninResponseDto> {
    const clientId = req[CustomHeaders.CLIENT_ID];
    const platform = req[CustomHeaders.PLATFORM] as Platform;

    switch (platform) {
      case Platform.MOBILE_APP:
        const mobileUser = await this.authService.validateUser(
          body.email,
          body.password,
          clientId,
        );
        if (!mobileUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(mobileUser);

      case Platform.BACK_OFFICE_CLIENT:
        const backOfficeClientUser = await this.authService.validateUser(
          body.email,
          body.password,
          clientId,
        );
        if (!backOfficeClientUser) {
          throw new UnauthorizedException();
        }
        return await this.authService.login(backOfficeClientUser);

      case Platform.BACK_OFFICE_INTERNAL:
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
