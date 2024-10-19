import {
  Body,
  Controller,
  Logger,
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
  private readonly logger = new Logger(AuthController.name);

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
    this.logger.log(
      `Received sign-in request with body: ${JSON.stringify(body)} and headers: ${JSON.stringify(req.headers)}`,
    );

    const origin = req.headers['x-origin'] as RequestOrigin;
    this.logger.log(`Request origin: ${origin}`);

    switch (origin) {
      case RequestOrigin.MOBILE_APP:
        const teamId = req.headers['x-client-id'];
        this.logger.log(`Team ID from headers: ${teamId}`);

        const mobileUser = await this.authService.validateUser(
          body.email,
          body.password,
          teamId as string,
        );
        if (!mobileUser) {
          this.logger.warn(
            `Failed to validate mobile user with email: ${body.email}`,
          );
          throw new UnauthorizedException();
        }
        this.logger.log(`Successfully validated mobile user: ${mobileUser.id}`);
        return await this.authService.login(mobileUser);

      case RequestOrigin.BACK_OFFICE_CLIENT:
        const organizationId = req.headers['x-client-id'];
        this.logger.log(`Organization ID from headers: ${organizationId}`);

        const backOfficeClientUser = await this.authService.validateUser(
          body.email,
          body.password,
          organizationId as string,
        );
        if (!backOfficeClientUser) {
          this.logger.warn(
            `Failed to validate back office client user with email: ${body.email}`,
          );
          throw new UnauthorizedException();
        }
        this.logger.log(
          `Successfully validated back office client user: ${backOfficeClientUser.id}`,
        );
        return await this.authService.login(backOfficeClientUser);

      default:
        this.logger.error(`Invalid platform origin: ${origin}`);
        throw new UnauthorizedException('Invalid platform');
    }
  }
}
