import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { Organization } from './organizations/entities/organization.entity';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlayersModule } from './players/players.module';
import { Role } from './roles/entities/role.entity';
import { RolesModule } from './roles/roles.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { StaffMembersModule } from './staff-members/staff-members.module';
import { Team } from './teams/entities/team.entity';
import { TeamsModule } from './teams/teams.module';
import { UserTeamRole } from './user-team-roles/entities/user-team-role';
import { UserTeamRolesModule } from './user-team-roles/user-team-roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Role, UserTeamRole, Team, Organization],
        synchronize: ['development', 'local'].includes(
          configService.get('NODE_ENV'),
        ),
      }),
    }),
    UsersModule,
    AuthModule,
    TeamsModule,
    RolesModule,
    UserTeamRolesModule,
    PlayersModule,
    MatchesModule,
    StaffMembersModule,
    SponsorsModule,
    OrganizationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
