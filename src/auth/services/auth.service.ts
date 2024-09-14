import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dtos/user-response.dto';
import { UsersService } from 'src/users/services/users.service';
import { SigninResponseDto } from '../dtos/signin-reponse.dto';
import { UserAuthDto } from '../dtos/user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
    teamId: string,
  ): Promise<UserAuthDto> {
    const user = await this.usersService.getUserByEmailAndTeam(email, teamId);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: UserResponseDto): Promise<SigninResponseDto> {
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
      teamId: user.teamId,
      organizationId: user.organizationId,
    };

    try {
      const result = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });

      return {
        access_token: result,
      };
    } catch (error) {
      console.log('Error generating token', error);

      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
