import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async signIn(@Body() body: SignInRequestDto): Promise<SigninResponseDto> {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
      body.teamId,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    const result = await this.authService.login(user);
    return result;
  }
}
