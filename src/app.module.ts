import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlayersModule } from './players/players.module';
import { RolesModule } from './roles/roles.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    RolesModule,
    UsersModule,
    OrganizationsModule,
    TeamsModule,
    StaffMembersModule,
    PlayersModule,
    MatchesModule,
    SponsorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
